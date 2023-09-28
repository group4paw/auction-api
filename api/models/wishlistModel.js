const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  idCustomer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "Customer",
  },
  idPainting: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "Painting",
  }
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
