const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  idDelivery: {
    type: Number,
    required: true,
    default: 0
  },
  custAddress: {
    type: String,
    required: true,
  },
  ongkir: {
    type: Number,
    required: true,
    default: 0
  },
},
{
    timestamps: true
    }
);

module.exports = mongoose.model("Delivery", deliverySchema);
