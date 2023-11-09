const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require("./api/config/db");
const dotenv = require("dotenv");

const cors = require("cors");
app.use(cors());

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
const AuctionRouter = require("./api/routes/Auction.js");
const CustomerRouter = require("./api/routes/Customer.js");
const SellerRouter = require("./api/routes/Seller.js");
const DeliveryRouter = require("./api/routes/Delivery.js");
const InsuranceRouter = require("./api/routes/Insurance.js");
const PaymentRouter = require("./api/routes/Payment.js");
const WishlistRouter = require("./api/routes/Wishlist.js");
const PaintingRouter = require("./api/routes/Painting.js");

app.use("/wishlist", WishlistRouter);
app.use("/customer", CustomerRouter);
app.use("/seller", SellerRouter);
app.use("/delivery", DeliveryRouter);
app.use("/insurance", InsuranceRouter);
app.use("/payment", PaymentRouter);
app.use("/auction", AuctionRouter);
app.use("/painting", PaintingRouter);
