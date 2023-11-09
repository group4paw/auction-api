const Wishlist = require("../models/Wishlist");
const Customer = require("../models/Customer");
const Painting = require("../models/Painting");

exports.createWishlist = async (req, res) => {
  const { idCustomer, idPainting } = req.body;

  // Create a new wishlist
  try {
    const wishlist = await Wishlist.create({
      idCustomer,
      idPainting,
    });
    res.status(201).json({
      success: true,
      data: wishlist,
      message: "Wishlist created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating the wishlist" });
  }
};

// Add a painting to the wishlist
exports.addToWishlist = async (req, res) => {
  const { idWishlist, idPainting } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ idWishlist });
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }

    const painting = await Painting.findOne({ idPainting });
    if (!painting) {
      return res.status(404).json({ error: "Painting not found" });
    }

    const wishlistItem = await WishlistItem.create({
      idWishlist,
      idPainting,
    });
    res.status(200).json({
      success: true,
      data: wishlistItem,
      message: "Wishlist Item added successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Error adding to wishlist" });
  }
};

// Remove a painting from the wishlist
exports.removeFromWishlist = async (req, res) => {
  const { idWishlist, idPainting } = req.params;

  try {
    const wishlistItem = await WishlistItem.findOneAndRemove({
      idWishlist,
      idPainting,
    });
    if (!wishlistItem) {
      return res.status(404).json({ error: "Wishlist item not found" });
    }

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: "Error removing from wishlist" });
  }
};

// Get paintings in the wishlist
// Get paintings in the wishlist
exports.getWishlistPaintings = async (req, res) => {
  const { idWishlist } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ idWishlist });
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }

    const wishlistItems = await WishlistItem.find({ idWishlist }).populate(
      "idPainting"
    );
    const paintings = wishlistItems.map((item) => item.idPainting);
    res.status(200).json(paintings);
  } catch (error) {
    res.status(500).json({ error: "Error fetching wishlist paintings" });
  }
};