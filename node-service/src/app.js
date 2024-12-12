const express = require("express");
const multer = require("multer");
const imageController = require("./controllers/imageController");

const app = express();
const upload = multer();

app.post("/process", upload.single("image"), imageController.processImage);

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Node.js Image Processing Service running on :${PORT}`);
});