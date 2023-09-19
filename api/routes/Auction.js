const express = require("express");
const router = express.Router();

const { addAuctionController, getAuctionsController } = require("../controllers/Auction.js");

// Register User
router.post("/add", addAuctionController);
router.get("/:auctionID?", getAuctionsController);

module.exports = router;
