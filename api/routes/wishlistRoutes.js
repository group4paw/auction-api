const express = require('express');
const router = express.Router();
const {
  createWishlist,
  addToWishlist,
  removeFromWishlist,
  getWishlistPaintings,
} = require('../controllers/WishlistController');

// Create a new wishlist
router.post('/addwishlist', createWishlist);

// Add a painting to the wishlist
router.post('/addwishlist/:idWishlist/add/:idPainting', addToWishlist);

// Remove a painting from the wishlist
router.delete('/addwishlist/:idWishlist/remove/:idPainting', removeFromWishlist);

// Get paintings in the wishlist
router.get('/addwishlist/:idWishlist/paintings', getWishlistPaintings);

module.exports = router;
