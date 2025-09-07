import express from "express";
import path from "path";
import fs from "fs";
import { resizeImage } from "../src/resize";

export const app = express();
const port = 3000;
const projectRoot = path.resolve(__dirname, "../../");

// Serve images folder
app.use("/images", express.static(path.join(projectRoot, "images")));

// Route: get a single image, optionally resized
app.get("/api/image", async (req, res) => {
  const { filename, width, height } = req.query;

  if (!filename || typeof filename !== "string") {
    return res.status(400).send("filename is required");
  }

  const sourceImagePath = path.join(projectRoot, "images", filename);

  if (!fs.existsSync(sourceImagePath)) {
    return res.status(404).send("Source image not found");
  }

  if (width && height) {
    const w = Number(width);
    const h = Number(height);
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0)
      return res.status(400).send("width and height must be positive numbers");

    const cacheDir = path.join(projectRoot, "cache");
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

    const resizedImagePath = path.join(
      cacheDir,
      `resized-${filename}-${w}x${h}.jpg`,
    );
    if (!fs.existsSync(resizedImagePath)) {
      console.log(`Resizing ${filename} to ${w}x${h}`);
      await resizeImage(sourceImagePath, w, h, resizedImagePath);
    }

    return res.status(200).contentType("jpg").sendFile(resizedImagePath);
  }

  res.sendFile(sourceImagePath);
});

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(projectRoot, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Route: list all images
app.get("/api/allImages", (req, res) => {
  const imagesDir = path.join(projectRoot, "images");
  try {
    const files = fs
      .readdirSync(imagesDir)
      .filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file));
    res.json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read images folder" });
  }
});
