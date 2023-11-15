const Auction = require("../models/Auction");
const Bid = require("../models/Bid");
const Customer = require("../models/Customer");

exports.getBidbyAuctionId = async (req, res) => {
  const auctionId = req.params.auctionId;
  try {
    const bids = await Bid.find({ auction: auctionId });
    data = [];

    for (let i = 0; i < bids.length; i++) {
      const bid = bids[i].toJSON();
      const bidder = await Customer.findById(bid.bidder);
      let temp = {};
      temp.name = bidder.name;
      temp.username = bidder.username;
      temp.image = bidder.image;
      bid.bidder = temp;
      data.push(bid);
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAuctionByUserIdByBidder = async (req, res) => {
  const { userId } = req.params;
  try {
    const bids = await Bid.find({ bidder: userId }).populate("auction").exec();
    return res.status(200).json(bids);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
