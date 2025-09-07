import fs from "fs";
import path from "path";
import { resizeImage } from "../src/resize";

describe("resizeImage utility function", () => {
  const projectRoot = path.resolve(__dirname, "../../");
  const testImage = path.join(projectRoot, "images", 'fjord.jpg');
  const outputImage = path.join(projectRoot, "cache", 'resized-fjord.jpg');

  afterEach(() => {
    if (fs.existsSync(outputImage)) {
      fs.unlinkSync(outputImage);
    }
  });

  it("should resize an image correctly with valid inputs", async () => {
    const width = 100;
    const height = 100;

    await resizeImage(testImage, width, height, outputImage);

    expect(fs.existsSync(outputImage)).toBeTrue();

    const sharpModule = await import("sharp");
    const metadata = await sharpModule.default(outputImage).metadata();

    expect(metadata.width).toBe(width);
    expect(metadata.height).toBe(height);
  });

  it("should throw an error if imagePath does not exist", async () => {
    const invalidPath = path.join(__dirname, "nonExistent.jpg");

    await expectAsync(
      resizeImage(invalidPath, 100, 100, outputImage),
    ).toBeRejected();
  });

  it("should throw an error if width or height are invalid", async () => {
    await expectAsync(
      resizeImage(testImage, NaN, 100, outputImage),
    ).toBeRejected();

    await expectAsync(
      resizeImage(testImage, 100, NaN, outputImage),
    ).toBeRejected();
  });
});
