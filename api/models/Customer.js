const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    custName: {
      type: String,
      required: true, 
    },
    custEmail: {
      type: String,
      required: true,
    },
    custPassword: {
      type: String,
      required: true,
    },
    custPhoneNumber: {
      type: Number,
      required: true,
    },
    custBalance: {
      type: Number,
      required: false,
    },
    custAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true
    }
);

module.exports = mongoose.model("Customer", customerSchema);
