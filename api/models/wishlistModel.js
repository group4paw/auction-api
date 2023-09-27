const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "Customer",
  }
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
