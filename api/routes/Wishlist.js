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
router.post("/", addToWishlist);

// Remove a painting from the wishlist
router.delete("/:userId/:idAuction", removeFromWishlist);

// Get paintings in the wishlist
router.get("/id/:id", getWishlistPaintings);

router.get("/:userId", getAllWishlist);

module.exports = router;
