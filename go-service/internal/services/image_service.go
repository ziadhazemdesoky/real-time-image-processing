package services

import (
	"image"
	"image/color"

	"github.com/nfnt/resize"
)

type ImageService struct{}

func NewImageService() *ImageService {
	return &ImageService{}
}

// ApplyGrayscale converts an image to grayscale
func (s *ImageService) ApplyGrayscale(img image.Image) image.Image {
	bounds := img.Bounds()
	grayImg := image.NewGray(bounds)

	for y := bounds.Min.Y; y < bounds.Max.Y; y++ {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
			grayColor := color.GrayModel.Convert(img.At(x, y))
			grayImg.Set(x, y, grayColor)
		}
	}

	return grayImg
}

// Resize resizes an image to a fixed width while maintaining the aspect ratio
func (s *ImageService) Resize(img image.Image, newWidth uint) image.Image {
	return resize.Resize(newWidth, 0, img, resize.Lanczos3)
}
