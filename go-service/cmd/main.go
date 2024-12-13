package main

import (
	"log"
	"net/http"
	"real-time-image-processing/internal/handlers"
	"runtime"
	"sync"
	"time"
)

func logMemoryStats() {
	var m runtime.MemStats
	for {
		runtime.ReadMemStats(&m)
		log.Printf("Alloc = %v KiB, Sys = %v KiB, NumGC = %v\n", m.Alloc/1024, m.Sys/1024, m.NumGC)
		time.Sleep(5 * time.Second)
	}
}

var (
	startTime time.Time
	endTime   time.Time
	mu        sync.Mutex
)

func main() {
	go logMemoryStats() // Start memory logging
	mux := http.NewServeMux()
	handlers.RegisterHandlers(mux)
	mux.HandleFunc("/start", func(w http.ResponseWriter, r *http.Request) {
		mu.Lock()
		defer mu.Unlock()
		startTime = time.Now()
		log.Println("Timer started")
		w.Write([]byte("Timer started"))
	})

	mux.HandleFunc("/stop", func(w http.ResponseWriter, r *http.Request) {
		mu.Lock()
		defer mu.Unlock()
		endTime = time.Now()
		elapsed := endTime.Sub(startTime)
		log.Printf("Total execution time: %s", elapsed)
		w.Write([]byte(elapsed.String()))
	})

	log.Println("Go Image Processing Service running on :8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}

func processHandler(w http.ResponseWriter, r *http.Request) {
	// Your processing logic here
	w.Write([]byte("Processed"))
}
