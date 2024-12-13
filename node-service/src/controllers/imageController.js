const { loadImage } = require("canvas");
const { applyGrayscale, resize } = require("../services/imageService");

function logMemoryUsage() {
  const memory = process.memoryUsage();
  return `RSS = ${(memory.rss / 1024 / 1024).toFixed(2)} MB, Heap Used = ${(memory.heapUsed / 1024 / 1024).toFixed(2)} MB`;
}

exports.processImage = async (req, res) => {
  const start = process.hrtime();

  try {
    const image = await loadImage(req.file.buffer);

    const grayImage = await applyGrayscale(image);
    const finalImage = await resize(grayImage, 800);

    res.set("Content-Type", "image/jpeg");
    res.send(finalImage.toBuffer("image/jpeg"));
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).send("Failed to process image");
  }

  const elapsed = process.hrtime(start);
  const processingTime = (elapsed[0] * 1e9 + elapsed[1]) / 1e6; // Convert to ms
  console.log(`Request processed in ${processingTime.toFixed(2)} ms | ${logMemoryUsage()}`);
};
