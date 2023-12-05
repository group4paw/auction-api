const mongoose = require("mongoose");

const Order = new mongoose.Schema(
  {
    idAuction: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "Auction",
    },
    idPainting: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "Painting",
    },
    highestBid: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    idSeller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "Seller",
    },
    seller: {
      type: String,
      required: true,
    },
    idCustomer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "Customer",
    },
    customer: {
      type: String,
      required: true,
    },
    addressFrom: {
      type: String,
      required: true,
    },
    addressTo: {
      type: String,
      required: false,
      default: "",
    },
    phoneNumber: {
      type: String,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    idInsurance: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: "Insurance",
    },
    expiredDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Need Confirmation", "Paid", "Not paid", "Shipped", "Done"],
      default: "Need Confirmation",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", Order);
