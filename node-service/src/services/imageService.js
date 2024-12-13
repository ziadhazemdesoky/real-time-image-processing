const { createCanvas } = require("canvas");

// Convert an image to grayscale
exports.applyGrayscale = async (image) => {
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(image, 0, 0);
  const imageData = ctx.getImageData(0, 0, image.width, image.height);

  for (let i = 0; i < imageData.data.length; i += 4) {
    const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
    imageData.data[i] = avg; // Red
    imageData.data[i + 1] = avg; // Green
    imageData.data[i + 2] = avg; // Blue
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
};

// Resize an image to a fixed width while maintaining aspect ratio
exports.resize = async (image, newWidth) => {
  const aspectRatio = image.height / image.width;
  const newHeight = Math.round(newWidth * aspectRatio);

  const canvas = createCanvas(newWidth, newHeight);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(image, 0, 0, newWidth, newHeight);
  return canvas;
};
