const { createCanvas, loadImage } = require("canvas");

exports.applyGrayscale = async (imageBuffer) => {
  const img = await loadImage(imageBuffer);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, img.width, img.height);

  for (let i = 0; i < imageData.data.length; i += 4) {
    const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
    imageData.data[i] = avg;      // Red
    imageData.data[i + 1] = avg;  // Green
    imageData.data[i + 2] = avg;  // Blue
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toBuffer("image/jpeg");
};