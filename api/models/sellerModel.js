const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  idSeller: {
    type: Number,
    required: true,
    default: 0
  },
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
    default: 0
  },
  sellerAddres: {
    type: String,
    required: true,
  },
},
{
    timestamps: true
    }
);

module.exports = mongoose.model("Customer", sellerSchema);
