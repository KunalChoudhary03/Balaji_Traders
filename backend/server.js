import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/db/db.js";

dotenv.config();
connectDB();

const url = `https://balaji-traders-8f7n.onrender.com`;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running at port ${PORT}`);
});
