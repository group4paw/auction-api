const Wishlist = require('../models/Wishlist');
const User = require('../models/User');
const Painting = require('../models/Painting');
const WishlistItem = require('../models/WishlistItem');

// Create a new wishlist
async function createWishlist(req, res) {
  const { idWishlist, idUser } = req.body;

  try {
    // Check if the user and wishlist already exist
    const user = await User.findById(idUser);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingWishlist = await Wishlist.findOne({ idWishlist });
    if (existingWishlist) {
      return res.status(409).json({ error: 'Wishlist already exists' });
    }

    const wishlist = await Wishlist.create({ idWishlist, idUser });
    res.status(201).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Error creating the wishlist' });
  }
}

// Add a painting to the wishlist
async function addToWishlist(req, res) {
  const { idWishlist, idPainting } = req.params;

  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { idWishlist },
      { $addToSet: { paintings: idPainting } },
      { new: true }
    );

    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }

    const wishlistItem = await WishlistItem.create({ idWishlist: wishlist._id, idPainting });
    res.status(200).json(wishlistItem);
  } catch (error) {
    res.status(500).json({ error: 'Error adding to wishlist' });
  }
}

// Remove a painting from the wishlist
async function removeFromWishlist(req, res) {
  const { idWishlist, idPainting } = req.params;

  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { idWishlist },
      { $pull: { paintings: idPainting } },
      { new: true }
    );

    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }

    await WishlistItem.findOneAndRemove({ idWishlist: wishlist._id, idPainting });
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Error removing from wishlist' });
  }
}

module.exports = {
  createWishlist,
  addToWishlist,
  removeFromWishlist,
};
