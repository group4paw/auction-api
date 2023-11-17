const mongoose = require("mongoose");

const topupSchema = new mongoose.Schema({
  idCustomer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "Customer",
  },
  topupId: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Success", "Failed"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Topup", topupSchema);
