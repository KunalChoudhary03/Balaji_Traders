const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/app");  
const connectDB = require("./src/db/db");
connectDB();

app.listen(process.env.PORT || 3000, () => {
  console.log(" Server running at port 3000");
});
