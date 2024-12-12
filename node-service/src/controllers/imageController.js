const imageService = require("../services/imageService");

exports.processImage = async (req, res) => {
  try {
    const processedImage = await imageService.applyGrayscale(req.file.buffer);
    res.set("Content-Type", "image/jpeg").send(processedImage);
  } catch (error) {
    res.status(500).send("Failed to process image");
  }
};