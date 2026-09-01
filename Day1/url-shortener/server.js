const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const app = express();
const PORT = 3003;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// JSON file sebagai database untuk mapping URL
const dbPath = path.join(__dirname, "urls.json");

function readUrls() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, "{}", "utf8");
  }
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
}

function saveUrls(urls) {
  fs.writeFileSync(dbPath, JSON.stringify(urls, null, 2), "utf8");
}

// Generate random short code (6 karakter)
function generateShortCode() {
  return crypto.randomBytes(3).toString("hex"); // 6 chars hex
}

// POST /shorten - Buat URL pendek
app.post("/shorten", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res
      .status(400)
      .json({ success: false, message: "URL is required" });
  }

  // Validasi URL sederhana
  try {
    new URL(url);
  } catch {
    return res
      .status(400)
      .json({ success: false, message: "Invalid URL format" });
  }

  const urls = readUrls();

  // Cek apakah URL sudah dipendekkan sebelumnya
  const existing = Object.entries(urls).find(
    ([, data]) => data.originalUrl === url
  );
  if (existing) {
    return res.json({
      success: true,
      data: {
        shortCode: existing[0],
        shortUrl: `http://localhost:${PORT}/${existing[0]}`,
        originalUrl: url,
      },
    });
  }

  const shortCode = generateShortCode();
  urls[shortCode] = {
    originalUrl: url,
    createdAt: new Date().toISOString(),
    clicks: 0,
  };

  saveUrls(urls);

  res.status(201).json({
    success: true,
    data: {
      shortCode,
      shortUrl: `http://localhost:${PORT}/${shortCode}`,
      originalUrl: url,
    },
  });
});

// GET /:shortCode - Redirect ke URL asli
app.get("/:shortCode", (req, res) => {
  const { shortCode } = req.params;
  const urls = readUrls();

  if (!urls[shortCode]) {
    return res
      .status(404)
      .json({ success: false, message: "Short URL not found" });
  }

  // Tambah click counter
  urls[shortCode].clicks++;
  saveUrls(urls);

  res.redirect(urls[shortCode].originalUrl);
});

// GET /stats/:shortCode - Lihat statistik short URL
app.get("/stats/:shortCode", (req, res) => {
  const { shortCode } = req.params;
  const urls = readUrls();

  if (!urls[shortCode]) {
    return res
      .status(404)
      .json({ success: false, message: "Short URL not found" });
  }

  res.json({
    success: true,
    data: {
      shortCode,
      ...urls[shortCode],
    },
  });
});

// GET /urls - Lihat semua shortened URLs
app.get("/urls", (req, res) => {
  const urls = readUrls();
  const allUrls = Object.entries(urls).map(([code, data]) => ({
    shortCode: code,
    shortUrl: `http://localhost:${PORT}/${code}`,
    ...data,
  }));

  res.json({ success: true, data: allUrls, total: allUrls.length });
});

app.listen(PORT, () => {
  console.log(`URL Shortener running at http://localhost:${PORT}`);
});
