const dotenv = require("dotenv");
dotenv.config();
import axios from "axios";
const app = require("./src/app");
const connectDB = require("./src/db/db");
connectDB();

const url = `https://balaji-traders-8f7n.onrender.com`;
const interval = 30000;

function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log("website reloded");
    })
    .catch((error) => {
      console.error(`Error : ${error.message}`);
    });
}

setInterval(reloadWebsite, interval);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running at port ${PORT}`);
});
