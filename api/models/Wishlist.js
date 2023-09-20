const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  idWishlist: { type: Number, unique: true, required: true },
  idUser: { type: Number, required: true },
});

wishlistSchema.methods.getPainting = async function (paintingId) {
  const WishlistItem = mongoose.model('WishlistItem');
  const item = await WishlistItem.findOne({ idWishlist: this.idWishlist, idPainting: paintingId });
  if (!item) {
    return null;
  }
  return item.toObject(); // Convert to plain JavaScript object or the desired type
};

module.exports = mongoose.model('Wishlist', wishlistSchema);
