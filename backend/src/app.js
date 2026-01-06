const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://balaji-traders-alpha.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Routes
app.use("/api/category", require("./routes/category.routes"));
app.use("/api/product", require("./routes/products.routes"));

//  Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// ❌ Extra complex error handlers hata diye
module.exports = app;
