const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  sellerName: {
    type: String,
    required: true,
  },
  sellerEmail: {
    type: String,
    required: true,
  },
  sellerPassword: {
    type: String,
    required: true,
  },
  sellerPhoneNumber: {
    type: Number,
    required: true,
  },
  sellerBalance: {
    type: Number,
    required: true,
  },
  sellerAddress: {
    type: String,
    required: true,
  },
},
{
    timestamps: true
    }
);

module.exports = mongoose.model("Seller", sellerSchema);
