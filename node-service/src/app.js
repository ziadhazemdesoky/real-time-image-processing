const express = require("express");
const multer = require("multer");
const imageController = require("./controllers/imageController");


const app = express();
const upload = multer();

setInterval(() => {
  const memory = process.memoryUsage();
  console.log(`RSS: ${(memory.rss / 1024 / 1024).toFixed(2)} MB, Heap Used: ${(memory.heapUsed / 1024 / 1024).toFixed(2)} MB`);
}, 5000);

app.post("/process", upload.single("image"), imageController.processImage);

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Node.js Image Processing Service running on :${PORT}`);
});

let startTime = null;
let endTime = null;

app.post("/start", (req, res) => {
    startTime = process.hrtime();
    console.log("Timer started");
    res.send("Timer started");
});

app.post("/stop", (req, res) => {
    endTime = process.hrtime(startTime);
    const elapsedTimeMs = (endTime[0] * 1e9 + endTime[1]) / 1e6; // Convert to ms
    console.log(`Total time: ${elapsedTimeMs} ms`);
    res.send(`Timer stopped. Total time: ${elapsedTimeMs} ms`);
});