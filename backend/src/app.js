import express from "express";
import cors from "cors";

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
import categoryRoutes from "./routes/category.routes.js";
import productRoutes from "./routes/products.routes.js";

app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);

//  Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// ❌ Extra complex error handlers hata diye
export default app;
