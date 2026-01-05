const express  = require('express');
const cors = require('cors');
const app = express();

// CORS middleware with environment variable
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// JSON parse karne ke liye middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes import
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/products.routes");

// Routes attach
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({ 
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

module.exports = app;
