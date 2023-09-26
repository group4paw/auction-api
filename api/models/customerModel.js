const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    idCustomer: {
      type: Number,
      required: true,
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
      required: false,
    },
    custAddres: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model("Customer", customerSchema);
