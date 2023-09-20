const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  idWishlist: { type: String, unique: true, required: true },
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  paintings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Painting' }],
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
