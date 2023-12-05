const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require("./api/config/db");
const dotenv = require("dotenv");
const multer = require("multer");
const axios = require("axios");

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

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
const BidRouter = require("./api/routes/Bid.js");
const uploadMiddleware = require("./api/middleware/multer.js");
const OrderRouter = require("./api/routes/Order.js");

app.use("/wishlist", WishlistRouter);
app.use("/customer", CustomerRouter);
app.use("/seller", SellerRouter);
app.use("/delivery", DeliveryRouter);
app.use("/insurance", InsuranceRouter);
app.use("/payment", PaymentRouter);
app.use("/auction", AuctionRouter);
app.use("/painting", PaintingRouter);
app.use("/bid", BidRouter);
app.use("/order", OrderRouter);

app.get("/images/:imageName", (req, res) => {
  res.sendFile(__dirname + "/public/uploads/" + req.params.imageName);
});

app.get("/ongkir", (req, res) => {
  const axios = require("axios");
  axios
    .get("https://api.rajaongkir.com/starter/city", {
      headers: {
        key: process.env.RAJAONGKIR_API_KEY,
      },
    })
    .then(function (response) {
      res.send(response.data);
    });
});

app.post("/ongkir", (req, res) => {
  const axios = require("axios");
  axios
    .post(
      "https://api.rajaongkir.com/starter/cost",
      {
        origin: req.body.origin,
        destination: req.body.destination,
        weight: req.body.weight,
        courier: "jne",
      },
      {
        headers: {
          key: process.env.RAJAONGKIR_API_KEY,
        },
      }
    )
    .then(function (response) {
      res.send(response.data);
    });
});
