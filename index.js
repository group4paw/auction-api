const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require("./api/config/db");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Auction!");
});

app.post("/customers", (req, res)=>{
  console.log(req.body);
  res.send(req.body);
})

connectDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

// Route
const UserRouter = require("./api/routes/User.js");
const CustomerRouter = require("./api/routes/customerRoutes.js");

app.use("/user", UserRouter);
app.use("", CustomerRouter);
