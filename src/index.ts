import express from 'express'
import path from 'path';

const app = express()
const port = 3000

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello There!');
})

app.get('/api/images', (req: express.Request, res: express.Response) => {
  const { filename } = req.query;
  if (!filename || typeof filename !== 'string') {
    res.status(400).send('filename is required');
    return;
  }
  const imagePath = path.join(process.cwd(), 'images', filename);
  res.sendFile(imagePath, err => {
    if (err) {
      res.status(404).send('Image not found');
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})