require("dotenv").config();
const express = require("express");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

// Import routes
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");
const ecommerceRoutes = require("./routes/ecommerce");

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "../public")));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/ecommerce", ecommerceRoutes);

// Root route - serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// 404 handler - serve index.html for HTML routes, JSON for API
app.use((req, res) => {
  if (req.accepts('html') && !req.url.startsWith('/api')) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  } else {
    res.status(404).json({
      success: false,
      message: "Rute tidak ditemukan",
    });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Kesalahan tidak tertangani:", err);
  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan server",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
====================================
  Server API Hari 2 Berjalan!
  Port: ${PORT}
  URL: http://localhost:${PORT}
====================================
  `);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
