import sharp from "sharp"

export const resizeImage = async (imagePath: string, width: number, height: number, outputImagePath: string): Promise<void> => {
  await sharp(imagePath)
    .resize(width, height)
    .toFile(outputImagePath);
}