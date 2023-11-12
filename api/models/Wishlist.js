const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  idCustomer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "Customer",
  },
  idAuction: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "Auction",
  },
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
