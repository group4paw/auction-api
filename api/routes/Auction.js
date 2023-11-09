const express = require("express");
const router = express.Router();

const {
  addAuctionController,
  getAuctionsController,
  removeAuctionsController,
  addBidController,
  setBidController,
  getAllAuctionsController,
} = require("../controllers/Auction.js");

// Register User
router.post("/", addAuctionController);
router.get("/", getAllAuctionsController);
router.get("/:auctionID?", getAuctionsController);
router.delete("/:auctionID/delete", removeAuctionsController);
router.put("/:auctionID/bid", addBidController);
router.post("/bid/:auctionID", setBidController);

module.exports = router;
