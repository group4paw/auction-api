const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  idWishlist: { type: Number, unique: true, required: true },
  idCustomer: { type: Number, required: true },
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
