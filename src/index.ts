import express from 'express'
import path from 'path';
import fs from 'fs';
import { resizeImage } from './resize';

const app = express()
const port = 3000

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello There!');
})


app.get('/api/images', async (req: express.Request, res: express.Response) => {
  const { filename, width, height } = req.query;
  if (!filename || typeof filename !== 'string') {
    return res.status(400).send('filename is required');
  }

  const sourceImagePath = path.join(process.cwd(), 'images', filename);

  // Check if source image exists
  if (!fs.existsSync(sourceImagePath)) {
    return res.status(404).send('Source image not found');
  }

  if (width && height) {
    if (isNaN(Number(width)) || isNaN(Number(height))) {
      return res.status(400).send('width and height must be numbers');
    }

    const resizedDir = path.join(process.cwd(), 'cache');
    if (!fs.existsSync(resizedDir)) {
      fs.mkdirSync(resizedDir);
    }
    const resizedImagePath = path.join(
      resizedDir,
      `resized-${filename}-${width}x${height}.jpg`
    );

    // Resize only if not already present
    if (!fs.existsSync(resizedImagePath)) {
      console.log('Creating a resized image');
      await resizeImage(sourceImagePath, Number(width), Number(height), resizedImagePath);
    }

    return res.status(200).contentType('jpg').sendFile(resizedImagePath);
  }

  res.sendFile(sourceImagePath, err => {
    if (err) {
      res.status(404).send('Image not found');
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})