import re
import pandas as pd
import matplotlib.pyplot as plt

# Parse Go logs
def parse_go_log(file_path):
    """Parse Go logs for processing time and request count."""
    data = {"Request Time (ms)": []}
    with open(file_path, "r") as file:
        for line in file:
            # Parse processing time
            if "Request processed in" in line:
                match = re.search(r"Request processed in (\d+(\.\d+)?)ms", line)
                if match:
                    data["Request Time (ms)"].append(float(match.group(1)))
    return pd.DataFrame(data)

# Parse Node.js logs
def parse_node_log(file_path):
    """Parse Node.js logs for processing time and request count."""
    data = {"Request Time (ms)": []}
    with open(file_path, "r") as file:
        for line in file:
            # Parse processing time
            if "Request processed in" in line:
                match = re.search(r"Request processed in (\d+(\.\d+)?) ms", line)
                if match:
                    data["Request Time (ms)"].append(float(match.group(1)))
    return pd.DataFrame(data)

# Calculate total requests and metrics
def calculate_metrics(data, duration):
    """Calculate throughput and average latency."""
    total_requests = len(data)
    total_latency = data["Request Time (ms)"].sum()
    avg_latency = total_latency / total_requests if total_requests > 0 else 0
    throughput = total_requests / duration
    return total_requests, avg_latency, throughput

# Plot metrics
def plot_metrics(go_metrics, node_metrics):
    """Visualize throughput and latency."""
    labels = ['Go', 'Node.js']

    # Throughput comparison
    throughputs = [go_metrics['Throughput'], node_metrics['Throughput']]
    plt.figure(figsize=(6, 4))
    plt.bar(labels, throughputs, color=['blue', 'orange'])
    plt.title("Throughput Comparison (RPS)")
    plt.ylabel("Requests per Second")
    plt.show()

    # Latency comparison
    latencies = [go_metrics['Average Latency'], node_metrics['Average Latency']]
    plt.figure(figsize=(6, 4))
    plt.bar(labels, latencies, color=['blue', 'orange'])
    plt.title("Latency Comparison (ms)")
    plt.ylabel("Average Latency (ms)")
    plt.show()

if __name__ == "__main__":
    # Log file paths
    go_log_file = "go_log.txt"
    node_log_file = "node_log.txt"

    # Benchmark duration (seconds)
    benchmark_duration = 30  # Adjust based on your wrk configuration

    # Parse logs
    go_data = parse_go_log(go_log_file)
    node_data = parse_node_log(node_log_file)

    # Calculate metrics
    go_total_requests, go_avg_latency, go_throughput = calculate_metrics(go_data, benchmark_duration)
    node_total_requests, node_avg_latency, node_throughput = calculate_metrics(node_data, benchmark_duration)

    # Metrics for visualization
    go_metrics = {
        "Total Requests": go_total_requests,
        "Average Latency": go_avg_latency,
        "Throughput": go_throughput,
    }
    node_metrics = {
        "Total Requests": node_total_requests,
        "Average Latency": node_avg_latency,
        "Throughput": node_throughput,
    }

    # Print metrics
    print("Go Metrics:", go_metrics)
    print("Node.js Metrics:", node_metrics)

    # Plot metrics
    plot_metrics(go_metrics, node_metrics)