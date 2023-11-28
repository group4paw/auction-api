const express = require("express");
const router = express.Router();

const {
  addAuctionController,
  getAuctionsController,
  removeAuctionsController,
  addBidController,
  setBidController,
  getAllAuctionsController,
  getAuctionsByIdController,
} = require("../controllers/Auction.js");

// Register User
router.post("/", addAuctionController);
router.get("/user/:userid?", getAllAuctionsController);
router.get("/:auctionID", getAuctionsByIdController);
// router.get("/:auctionID?", getAuctionsController);
router.delete("/:auctionID", removeAuctionsController);
router.put("/:auctionID/bid", addBidController);
router.post("/bid/:auctionID", setBidController);

module.exports = router;
