const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
  idWishlist: { type: Number, required: true },
  idPainting: { type: Number, required: true },
  // Add other wishlist item-related fields as needed
});

module.exports = mongoose.model('WishlistItem', wishlistItemSchema);
