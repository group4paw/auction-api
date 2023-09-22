const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  idCustomer: {
    type: Number,
    required: true,
    default: 0
  },
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
    required: true,
    default: 0
  },
},
{
    timestamps: true
    }
);

module.exports = mongoose.model("Customer", customerSchema);
