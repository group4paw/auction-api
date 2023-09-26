const Wishlist = require('../models/Wishlist');
const Customer = require('../models/Customer');
const Painting = require('../models/Painting');
const WishlistItem = require('../models/WishlistItem');

// Create a new wishlist
async function createWishlist(req, res) {
  const { idWishlist, idCustomer } = req.body;

  try {
    // Check if the customer and wishlist already exist
    const customer = await Customer.findOne({ idCustomer });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const existingWishlist = await Wishlist.findOne({ idWishlist });
    if (existingWishlist) {
      return res.status(409).json({ error: 'Wishlist already exists' });
    }

    const wishlist = await Wishlist.create({ idWishlist, idCustomer });
    res.status(201).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: 'Error creating the wishlist' });
  }
}

// Add a painting to the wishlist
async function addToWishlist(req, res) {
  const { idWishlist, idPainting } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ idWishlist });
    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }

    const painting = await Painting.findOne({ idPainting });
    if (!painting) {
      return res.status(404).json({ error: 'Painting not found' });
    }

    const wishlistItem = await WishlistItem.create({ idWishlist, idPainting });
    res.status(200).json(wishlistItem);
  } catch (error) {
    res.status(500).json({ error: 'Error adding to wishlist' });
  }
}

// Remove a painting from the wishlist
async function removeFromWishlist(req, res) {
  const { idWishlist, idPainting } = req.params;

  try {
    const wishlistItem = await WishlistItem.findOneAndRemove({ idWishlist, idPainting });
    if (!wishlistItem) {
      return res.status(404).json({ error: 'Wishlist item not found' });
    }

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Error removing from wishlist' });
  }
}

// Get paintings in the wishlist
async function getWishlistPaintings(req, res) {
  const { idWishlist } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ idWishlist });
    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }

    const wishlistItems = await WishlistItem.find({ idWishlist }).populate('idPainting');
    const paintings = wishlistItems.map((item) => item.idPainting);
    res.status(200).json(paintings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching wishlist paintings' });
  }
}

module.exports = {
  createWishlist,
  addToWishlist,
  removeFromWishlist,
  getWishlistPaintings,
};
