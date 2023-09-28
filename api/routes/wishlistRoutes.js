const express = require('express');
const router = express.Router();
const {
  createWishlist,
  removeFromWishlist,
  getWishlistPaintings,
} = require('../controllers/WishlistController');

// Create a new wishlist
router.post('/addwishlist', createWishlist);

// Remove a painting from the wishlist
router.delete('/addwishlist/:id/remove/:id', removeFromWishlist);

// Get paintings in the wishlist
router.get('/addwishlist/:id/paintings', getWishlistPaintings);

module.exports = router;
