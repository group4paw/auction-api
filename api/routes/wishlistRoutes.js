const express = require('express');
const router = express.Router();
const {
  createWishlist,
  addToWishlist,
  removeFromWishlist,
  getWishlistPaintings,
} = require('../controllers/WishlistController');

// Create a new wishlist
router.post('/wishlist', createWishlist);

// Add a painting to the wishlist
router.post('/wishlist/:idWishlist/add/:idPainting', addToWishlist);

// Remove a painting from the wishlist
router.delete('/wishlist/:idWishlist/remove/:idPainting', removeFromWishlist);

// Get paintings in the wishlist
router.get('/wishlist/:idWishlist/paintings', getWishlistPaintings);

module.exports = router;
