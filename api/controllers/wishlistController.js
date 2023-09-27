const Wishlist = require('../models/wishlistModel');
const Customer = require('../models/customerModel');
const Painting = require('../models/paintingModel');
const WishlistItem = require('../models/wishlistItemModel');

// Create a new wishlist
exports.createWishlist = async (req, res) => {
  const {  
    customerId 
  } = req.body;

  try {
    // Check if the customer and wishlist already exist
    const customer = await Customer.findOne({ customerId });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const existingWishlist = await Wishlist.findOne({ idWishlist });
    if (existingWishlist) {
      return res.status(409).json({ error: 'Wishlist already exists' });
    }

    const wishlist = await Wishlist.create({ 
      customerId 
    });
    res.status(201).json({
      success: true,
      data: wishlist,
      message: "Wishlist created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating the wishlist' });
  }
}

// Add a painting to the wishlist
exports.addToWishlist = async (req, res) => {
  const { 
    idWishlist,
    idPainting 
  } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ idWishlist });
    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }

    const painting = await Painting.findOne({ idPainting });
    if (!painting) {
      return res.status(404).json({ error: 'Painting not found' });
    }

    const wishlistItem = await WishlistItem.create({ 
      idWishlist, 
      idPainting 
    });
    res.status(200).json({
      success: true,
      data: wishlistItem,
      message: "Wishlist Item added successfully",
    });
  } catch (error) {
    res.status(500).json({ error: 'Error adding to wishlist' });
  }
}

// Remove a painting from the wishlist
exports.removeFromWishlist = async (req, res) => {
  const { 
    idWishlist, 
    idPainting 
  } = req.params;

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
// Get paintings in the wishlist
exports.getWishlistPaintings = async (req, res) => {
  const { 
    idWishlist 
  } = req.params;

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


