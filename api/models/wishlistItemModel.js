const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
  idWishlist: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "Wishlist",
  },
  idPainting: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "Painting",
  },
});

module.exports = mongoose.model('WishlistItem', wishlistItemSchema);
