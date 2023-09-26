const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  custAddress: {
    type: String,
    required: true,
  },
  ongkir: {
    type: Number,
    required: true,
    default: 0
  },
  idCustomer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "Customer",
  },
  idSeller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "Seller",
  },
  custAddress: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "Customer",
  },
  custPhoneNumber: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "Customer",
  },
  sellerAddress: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "Seller",
  },
  idInsurance: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "Insurance",
  },
  ongkir:{
    type: Number,
    require: true,
  },
},
{
    timestamps: true
    }
);

module.exports = mongoose.model("Delivery", deliverySchema);
