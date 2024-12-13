#!/bin/bash

# Start the timer
curl -X POST http://localhost:8081/start

# Run the wrk benchmark
wrk -t4 -c50 -d30s -s post.lua http://localhost:8081/process

# Stop the timer
curl -X POST http://localhost:8081/stop
