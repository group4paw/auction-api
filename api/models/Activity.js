const mongoose = require("mongoose");

const Activity = new mongoose.Schema({
  idBid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "Bid",
  },
});

module.exports = mongoose.model("Activity", Activity);
