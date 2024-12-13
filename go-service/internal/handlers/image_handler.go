package handlers

import (
	"bytes"
	"fmt"
	"image"
	"image/jpeg"
	"log"
	"net/http"
	"real-time-image-processing/internal/services"
	"runtime"
	"time"
)

var imageService = services.NewImageService()

func RegisterHandlers(mux *http.ServeMux) {
	mux.HandleFunc("/process", processImageHandler)
}

func logMemoryUsage() string {
	var memStats runtime.MemStats
	runtime.ReadMemStats(&memStats)
	return fmt.Sprintf("Alloc = %d KiB, Sys = %d KiB, NumGC = %d",
		memStats.Alloc/1024, memStats.Sys/1024, memStats.NumGC)
}

func processImageHandler(w http.ResponseWriter, r *http.Request) {
	start := time.Now()

	// Read the file
	file, _, err := r.FormFile("image")
	if err != nil {
		http.Error(w, "Invalid image upload", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Decode and process the image
	img, _, err := image.Decode(file)
	if err != nil {
		http.Error(w, "Unsupported image format", http.StatusBadRequest)
		return
	}
	grayImg := imageService.ApplyGrayscale(img)
	finalImg := imageService.Resize(grayImg, 800)

	// Encode the final image
	var buf bytes.Buffer
	err = jpeg.Encode(&buf, finalImg, nil)
	if err != nil {
		http.Error(w, "Failed to process image", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "image/jpeg")
	w.Write(buf.Bytes())

	// Log processing time and memory usage
	elapsed := time.Since(start)
	log.Printf("Request processed in %s | %s", elapsed, logMemoryUsage())
}
