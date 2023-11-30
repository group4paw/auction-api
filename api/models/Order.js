const mongoose = require("mongoose");

const Order = new mongoose.Schema(
  {
    idAuction: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "Auction",
    },
    highestBid: {
      type: Number,
      required: true,
    },
    idSeller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "Seller",
    },
    idCustomer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "Customer",
    },
    shipTo: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["Need Confirmation", "Paid", "Shipped", "Done"],
      default: "Need Confirmation",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", Order);
