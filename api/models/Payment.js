const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  idDelivery: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "Delivery",
  },
  idPainting: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "Painting",
  },
  lastBidPrice: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  custBalance: {
    type: Number,
    required: true,
  },
  sellerBalance: {
    type: Number,
    required: true,
  },
  totalPurchase: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "Seller",
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "Customer",
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
