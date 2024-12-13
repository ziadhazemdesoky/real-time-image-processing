# Real-Time Image Processing Benchmark

This project benchmarks the performance of Go and Node.js for real-time image processing tasks. The analysis evaluates throughput, latency, and the total number of requests processed under identical conditions.

## **Setup Instructions**

### **1. Prerequisites**
- Install [wrk](https://github.com/wg/wrk) for benchmarking.
- Install Python 3 with `pandas` and `matplotlib` libraries.
- Ensure Go and Node.js are installed on your system.

### **2. Start the Servers**

#### **Go Server**
1. Navigate to the Go server directory:
   ```bash
   cd go-service
   ```
2. Run the Go server:
   ```bash
   go run cmd/main.go
   ```

#### **Node.js Server**
1. Navigate to the Node.js server directory:
   ```bash
   cd node-service
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Node.js server:
   ```bash
   node src/app.js
   ```

### **3. Run Benchmarks**
1. Prepare the `wrk` benchmarking script (`post.lua`) to send image requests.
2. Start benchmarking with `wrk`:
   ```bash
   wrk -t4 -c50 -d30s -s post.lua http://localhost:8080/process  # Go
   wrk -t4 -c50 -d30s -s post.lua http://localhost:8081/process  # Node.js
   ```
3. Save the logs:
   ```bash
   wrk -t4 -c50 -d30s -s post.lua http://localhost:8080/process > go_log.txt
   wrk -t4 -c50 -d30s -s post.lua http://localhost:8081/process > node_log.txt
   ```

### **4. Analyze Results**

1. Ensure the Python environment is set up:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install pandas matplotlib
   ```

2. Run the analysis script:
   ```bash
   python3 log_analysis.py
   ```

3. Output includes:
   - Total requests processed.
   - Average latency per request.
   - Throughput (requests per second).
   - Visualized comparisons of throughput and latency.

### **5. Example Metrics**

#### **Go Metrics:**
- Total Requests: 2394
- Average Latency: 519 ms
- Throughput: 79.8 requests/second

#### **Node.js Metrics:**
- Total Requests: 1341
- Average Latency: 22.55 ms
- Throughput: 44.7 requests/second

### **6. Interpretation**
- Go excels in high-throughput scenarios but has higher request latency.
- Node.js provides lower latency but lower throughput.
- Use the metrics to determine suitability for your specific application.

## **License**
This project is licensed under the MIT License.
