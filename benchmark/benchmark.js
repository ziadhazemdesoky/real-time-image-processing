const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const url = 'http://localhost:8080/process'; // Update to Node.js service URL if testing it
const imagePath = './sample.jpg';
const totalRequests = 5000; 
const concurrency = 10; 

(async function benchmark() {
    console.log(`Starting benchmark for ${url}`);
    
    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath);

    const startTime = Date.now();
    const promises = [];

    for (let i = 0; i < totalRequests; i++) {
        const form = new FormData();
        form.append('image', imageBuffer, 'sample.jpg');
        // Make the POST request
        const request = axios.post(url, form, {
            headers: form.getHeaders(),
        }).catch((err) => {
            console.error(`Request ${i + 1} failed: ${err.response?.status || err.message}`);
        });

        promises.push(request);

        // Wait for the current batch to finish if concurrency limit is reached
        if (i % concurrency === 0) {
            await Promise.all(promises);
            promises.length = 0;
        }
    }

    await Promise.all(promises);

    const duration = (Date.now() - startTime) / 1000;
    console.log(`Completed ${totalRequests} requests in ${duration.toFixed(2)} seconds`);
    console.log(`Average time per request: ${(duration / totalRequests * 1000).toFixed(2)} ms`);
})();