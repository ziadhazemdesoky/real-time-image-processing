package main

import (
	"log"
	"net/http"
	"real-time-image-processing/internal/handlers"
)

func main() {
	mux := http.NewServeMux()
	handlers.RegisterHandlers(mux)

	log.Println("Go Image Processing Service running on :8080")
	log.Fatal(http.ListenAndServe(":8080", mux))
}
