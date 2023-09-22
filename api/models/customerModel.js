const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    idCustomer: {
      type: String,
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
      type: String,
      required: true,
    },
    custBalance: {
      type: String,
      required: false,
    },
  },
);

module.exports = mongoose.model("Customer", customerSchema);
