const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
  idWishlist: { type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist', required: true },
  idPainting: { type: mongoose.Schema.Types.ObjectId, ref: 'Painting', required: true },
});

module.exports = mongoose.model('WishlistItem', wishlistItemSchema);
