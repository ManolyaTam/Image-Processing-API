import request from 'supertest';
import { app } from '../src/index';

describe('GET /api/images', () => {
  it('should return 400 if filename is missing', async () => {
    const res = await request(app).get('/api/images');
    expect(res.status).toBe(400);
    expect(res.text).toContain('filename is required');
  });

  it('should return 404 if source image does not exist', async () => {
    const res = await request(app).get('/api/images?filename=notfound.jpg');
    expect(res.status).toBe(404);
    expect(res.text).toContain('Source image not found');
  });

  it('should return the image if it exists', async () => {
    const res = await request(app).get('/api/images?filename=fjord.jpg');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('image');
  });

  it('should return 400 if width/height are not numbers', async () => {
    const res = await request(app).get('/api/images?filename=fjord.jpg&width=abc&height=123');
    expect(res.status).toBe(400);
    expect(res.text).toContain('width and height must be numbers');
  });

  it('should return resized image if width and height are valid', async () => {
    const res = await request(app).get('/api/images?filename=fjord.jpg&width=100&height=100');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('image');
  });
});