package handlers

import (
	"bytes"
	"image"
	"image/jpeg"
	"log"
	"net/http"
	"real-time-image-processing/internal/services"
)

var imageService = services.NewImageService()

func RegisterHandlers(mux *http.ServeMux) {
	mux.HandleFunc("/process", processImageHandler)
}

func processImageHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	file, _, err := r.FormFile("image")
	if err != nil {
		log.Printf("Error reading form file: %v", err)
		http.Error(w, "Failed to read image", http.StatusBadRequest)
		return
	}
	defer file.Close()

	img, _, err := image.Decode(file)
	if err != nil {
		http.Error(w, "Invalid image format", http.StatusBadRequest)
		return
	}

	processedImage := imageService.ApplyGrayscale(img)

	var buf bytes.Buffer
	if err := jpeg.Encode(&buf, processedImage, nil); err != nil {
		http.Error(w, "Failed to encode image", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "image/jpeg")
	w.Write(buf.Bytes())
}
