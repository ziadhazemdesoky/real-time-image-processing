README for Real-Time Image Processing Project

Real-Time Image Processing Service

This project demonstrates a real-time image processing service implemented in both Go and Node.js. It allows users to upload an image, applies transformations (e.g., grayscale), and returns the processed image in near real-time.

The service is designed to be CPU-intensive and highlights performance and readability differences between Go and Node.js implementations.

Features
	•	Upload an image for processing via a /process endpoint.
	•	Apply grayscale transformation to the image.
	•	Return the processed image in JPEG format.
	•	Benchmark the performance of both Go and Node.js implementations under high load.

Project Structure

/real-time-image-processing
├── go-service                  # Go implementation
│   ├── cmd                     # Main application entry point
│   ├── internal
│   │   ├── handlers            # HTTP handlers
│   │   └── services            # Business logic (image processing)
│   └── go.mod                  # Go module file
├── node-service                # Node.js implementation
│   ├── src
│   │   ├── app.js              # Main application entry point
│   │   ├── controllers         # Route controllers
│   │   └── services            # Business logic (image processing)
│   ├── package.json            # Node.js dependencies
└── benchmark                   # Benchmarking utilities
    └── benchmark.js            # Script for performance testing

Getting Started

1. Prerequisites
	•	Go (1.20+)
	•	Node.js (16+)
	•	npm (8+)
	•	Multer (for Node.js file upload)
	•	Canvas (Node.js image processing library)
	•	wrk or Apache Benchmark (for benchmarking)

2. Clone the Repository

git clone https://github.com/your-repo/real-time-image-processing.git
cd real-time-image-processing

3. Running the Go Service

Install Dependencies

cd go-service
go mod tidy

Run the Service

go run cmd/main.go

The Go service will run on http://localhost:8080.

4. Running the Node.js Service

Install Dependencies

cd node-service
npm install

Run the Service

node src/app.js

The Node.js service will run on http://localhost:8081.

5. Usage

Upload and Process an Image

Make a POST request to the /process endpoint with a form-data payload containing an image file:

curl -X POST http://localhost:8080/process \
  -F "image=@path/to/image.jpg" \
  -o processed_image.jpg

For Node.js:

curl -X POST http://localhost:8081/process \
  -F "image=@path/to/image.jpg" \
  -o processed_image.jpg

Performance Benchmarking

1. Using wrk

wrk -t12 -c400 -d30s -s benchmark/benchmark.lua http://localhost:8080/process

2. Using Apache Benchmark

ab -n 1000 -c 100 -p sample_payload.txt -T "multipart/form-data" http://localhost:8080/process

3. Node.js Benchmark Script

Edit benchmark/benchmark.js to specify the target URL and image file, then run:

node benchmark/benchmark.js

Results Comparison

Benchmark metrics to compare between Go and Node.js:
	1.	Latency: Average time per request (ms).
	2.	Throughput: Requests per second (rps).
	3.	Resource Usage: CPU and memory consumption.

Design Highlights

Go Implementation
	•	Uses the image package for efficient image manipulation.
	•	Designed with a clean modular architecture (handlers, services).

Node.js Implementation
	•	Utilizes the canvas library for image processing.
	•	Clean separation of concerns with controllers and services.

Contributing

Contributions are welcome! Please follow these steps:
	1.	Fork the repository.
	2.	Create a new branch (feature/your-feature-name).
	3.	Commit your changes.
	4.	Push the branch and create a pull request.

License

This project is licensed under the MIT License. See the LICENSE file for details.

Contact

For questions or support, please reach out to:
	•	Email: ziadhazemdesoky@gmail.com

Would you like to customize any part of this README further?