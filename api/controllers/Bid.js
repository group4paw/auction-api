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
      temp._id = bidder._id;
      bid.bidder = temp;
      data.push(bid);
    }

    // sort bid by date and get top 3
    data.sort((a, b) => {
      return b.bidDate - a.bidDate;
    });
    data = data.slice(0, 3);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAuctionByUserIdByBidder = async (req, res) => {
  const { userId } = req.params;
  try {
    const bids = await Bid.find({ bidder: userId });
    return res.status(200).json(bids);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
