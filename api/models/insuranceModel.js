const mongoose = require("mongoose");

const insuranceSchema = new mongoose.Schema({
  idInsurance: {
    type: Number,
    required: true,
    default: 0
  },
  insuranceName: {
    type: String,
    required: true,
  },
  insurancePrice: {
    type: Number,
    required: true,
  },
},
{
    timestamps: true
    }
);

module.exports = mongoose.model("Insurance", insuranceSchema);
