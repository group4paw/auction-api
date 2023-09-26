const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  idSeller: {
    type: Number,
    required: true,
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
  },
  sellerAddres: {
    type: String,
    required: true,
  },
  sellerModel: {
    type: String,
    required: true,
  }
},
{
    timestamps: true
    }
);

module.exports = mongoose.model("Seller", sellerSchema);
