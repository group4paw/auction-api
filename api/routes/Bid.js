const express = require("express");
const router = express.Router();

const { getBidbyAuctionId } = require("../controllers/Bid.js");
const { getAuctionByUserIdByBidder } = require("../controllers/Bid.js");

router.get("/:auctionId", getBidbyAuctionId);
router.get("/user/:userId", getAuctionByUserIdByBidder);
module.exports = router;
