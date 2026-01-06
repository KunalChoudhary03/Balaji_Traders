const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/app");
const connectDB = require("./src/db/db");
connectDB();

// Routes are attached inside src/app.js ("/api/category" and "/api/product")

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running at port ${PORT}`);
});
