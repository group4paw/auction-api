const express = require("express");
const router = express.Router();

const { getBidbyAuctionId } = require("../controllers/Bid.js");

router.get("/:auctionId", getBidbyAuctionId);

module.exports = router;
