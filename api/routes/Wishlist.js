const express = require("express");
const router = express.Router();
const {
  createWishlist,
  removeFromWishlist,
  getWishlistPaintings,
  getAllWishlist,
  addToWishlist,
} = require("../controllers/Wishlist");

// Create a new wishlist
router.post("/wishlist", addToWishlist);

// Remove a painting from the wishlist
router.delete("/wishlist/:id", removeFromWishlist);

// Get paintings in the wishlist
router.get("/wishlist/id/:id", getWishlistPaintings);

router.get("/wishlist/user", getAllWishlist);

module.exports = router;
