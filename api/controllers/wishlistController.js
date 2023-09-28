const Wishlist = require('../models/wishlistModel');
const Customer = require('../models/customerModel');
const Painting = require('../models/paintingModel');
const wishlistModel = require('../models/wishlistModel');


exports.createWishlist = async (req, res) => {
  const {  
    idCustomer,
    idPainting 
  } = req.body;

// Create a new wishlist item
try {
  const wishlist = await Wishlist.create({ 
    idCustomer,
    idPainting
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

// Remove a painting from the wishlist
exports.removeFromWishlist = async (req, res) => {
  const { 
    idCustomer, 
    idPainting 
  } = req.params;

  try {
    const wishlist = await Wishlist.findOneAndRemove({ idCustomer, idPainting });
    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist item not found' });
    }
    res.status(204).json({
      success: true,
      message: "Wishlist item removed successfully"
    });
  } catch (error) {
    res.status(500).json({ error: 'Error removing from wishlist' });
  }
}

// Get paintings in the wishlist
exports.getWishlistPaintings = async (req, res) => {
  const { 
    idCustomer
  } = req.params;

  try {
    const customer = await Customer.findOne({ idCustomer });
    if (!customer) {
      return res.status(404).json({ error: 'Customer Wishlist not found' });
    }

    const wishlistItems= await Wishlist.find({ idCustomer }).populate('idPainting');
    const paintings = wishlistItems.map((item) => item.idPainting);
    res.status(200).json(paintings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching wishlist paintings' });
  }
}


