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



connectDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});

// Route
const UserRouter = require("./api/routes/User.js");
const CustomerRouter = require("./api/routes/customerRoutes.js");
const SellerRouter = require("./api/routes/sellerRoutes.js");
const DeliveryRouter = require("./api/routes/deliveryRoutes.js");
const InsuranceRouter = require("./api/routes/insuranceRoutes.js");

app.use("/user", UserRouter);
app.use("/customer", CustomerRouter);
app.use("/seller", SellerRouter);
app.use("/delivery", DeliveryRouter);
app.use("/insurance", InsuranceRouter);

