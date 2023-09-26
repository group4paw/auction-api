const express = require("express");
const router = express.Router();

const { addAuctionController, getAuctionsController, removeAuctionsController, addBidController } = require("../controllers/Auction.js");

// Register User
router.post("/add", addAuctionController);
router.get("/:auctionID?", getAuctionsController);
router.delete("/:auctionID/delete", removeAuctionsController);
router.put("/:auctionID/bid", addBidController);

module.exports = router;
