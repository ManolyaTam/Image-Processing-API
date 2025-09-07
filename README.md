# Image Processing API

## Overview

A Node.js and Express server that allows users to **view and resize images** dynamically. Users can access a gallery of images, click to preview them, and request a resized version through the API. Resized images are cached for faster subsequent requests.

This project demonstrates:

* Modular architecture separating source code, compiled code, and tests.
* Proper error handling for invalid image resizing parameters.
* TypeScript usage for safer and maintainable code.
* Testing with Jasmine and SuperTest.

---

## Getting Started

1. **Clone the repository**:

```bash
git clone https://github.com/ManolyaTam/Image-Processing-API.git
cd Image-Processing-API
```

2. **Install dependencies**:

```bash
npm install
```

3. **Run the server**:

```bash
npm run build
npm start
```

The server will be available at: `http://localhost:3000`

---

### Scripts

| Script           | Description                                                          |
| ---------------- | -------------------------------------------------------------------- |
| `npm start`      | Runs the compiled server from `dist/`.                               |
| `npm run build`  | Compiles TypeScript files to JavaScript.                             |
| `npm test`       | Runs Jasmine unit tests (including image processing function tests). |
| `npm run lint`   | Runs ESLint on source and test files.                                |
| `npm run format` | Runs Prettier to format all project files.                           |
| `npm run dev`    | Development mode: watches `src/` and rebuilds on changes.            |

---

## Project Structure

```md
Image-Processing-API/
│
├─ src/             # Source TypeScript files
│  ├─ index.ts      # Main server
│  └─ resize.ts     # Image processing utility
│
├─ dist/            # Compiled JavaScript output
├─ images/          # Original images
├─ cache/           # Cached resized images (filenames: resized-{name}-{width}x{height}.ext)
├─ public/          # HTML gallery and static files
├─ spec/            # Jasmine/SuperTest tests
├─ package.json
└─ tsconfig.json
```

---

## Routes / API Endpoints

* `/images` → Serves static original images.
* `/api/allImages` → Returns JSON list of all images in `/images`.
* `/api/image?filename=&width=&height=` → Resizes an image to specified dimensions (width and height are optional), caches it, and returns it.

**Error Handling**:

* Invalid `width` or `height` values (non-numbers, negative numbers, or zero) return **400 Bad Request**.
* Non-existent image → 404 Not Found.

Cached filenames follow the pattern: `resized-{originalName}-{width}x{height}.{ext}`.

---

## Testing

* Unit tests for **image processing utility** are in `spec/resize.test.ts`.
* API tests using **SuperTest** are in `spec/index.test.ts`.

to Run all tests:

```bash
npm test
```

Tests cover:

* Successful image resizing.
* Caching behavior.
* Error handling for invalid images/dimensions.

---

## Tools Used

* Node.js
* Express
* TypeScript
* Sharp (image processing)
* Jasmine (unit testing)
* SuperTest (API testing)
* ESLint + Prettier (linting and formatting)

---

## Credits

Based on Udacity's **Server Project Starter** and open-source libraries like Sharp, Express, Jasmine, and SuperTest.
