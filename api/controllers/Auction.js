const { validationResult } = require("express-validator");
const ObjectId = require("mongodb").ObjectId;
const Auction = require("../models/Auction.js");
const Seller = require("../models/Seller.js");
const Bid = require("../models/Bid.js");
const { default: mongoose } = require("mongoose");
const Customer = require("../models/Customer.js");

exports.addAuctionController = async (req, res) => {
  const {
    userid,
    startingPrice,
    reservePrice,
    startDate,
    endDate,
    idPainting,
  } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res
      .status(422)
      .json({ errors: errors.array().map((error) => error.msg)[0] });

  // authorization if needed

  // parse dates
  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);

  // type checks
  if (
    typeof userid !== "string" ||
    typeof startingPrice !== "number" ||
    typeof reservePrice !== "number" ||
    isNaN(parsedStartDate) || // invalid dates are NaN
    isNaN(parsedEndDate) || // invalid dates are NaN
    typeof idPainting !== "string"
  )
    return res.status(400).json({ message: "Invalid data provided." });

  // additional check
  if (startDate >= endDate)
    return res.status(400).json({ message: "Invalid date range." });

  try {
    const auction = await Auction({
      owner: new mongoose.Types.ObjectId(userid),
      startingPrice: startingPrice,
      reservePrice: reservePrice,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      idPainting: new mongoose.Types.ObjectId(idPainting),
    });
    await auction.save();
    return res.status(201).json({
      success: true,
      data: auction,
      message: "Auction created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getAllAuctionsController = async (req, res) => {
  // additional data helper function
  const { userid } = req.params;
  let getAuctions;
  if (!userid) {
    getAuctions = await Auction.find().populate("idPainting").exec();
  } else {
    getAuctions = await Auction.find({ owner: userid })
      .populate("idPainting")
      .exec();
  }

  // loop auction
  for (let i = 0; i < getAuctions.length; i++) {
    const auction = getAuctions[i].toJSON();
    if (auction.startDate > new Date()) {
      auction.status = "coming-soon";
      time = auction.startDate - new Date();
      auction.timeLeft = time;
    }
    if (auction.startDate <= new Date()) {
      auction.status = "live";
      auction.timeLeft = auction.endDate - new Date();
    }
    if (auction.endDate <= new Date()) auction.status = "over";

    const bid = await Bid.find({ auction: auction._id })
      .sort({ amount: -1 })
      .limit(1)
      .exec();
    if (bid.length > 0) {
      auction.highestBid = bid[0].amount;
    } else {
      auction.highestBid = auction.startingPrice;
    }

    const seller = await Seller.findById(auction.owner).exec();
    auction.owner = {
      name: seller.name,
      image: seller.image,
    };

    getAuctions[i] = auction;
  }

  return res.status(200).json(getAuctions);
};

exports.getAuctionsByIdController = async (req, res) => {
  // additional data helper function
  const getAuctions = await Auction.find({
    _id: new mongoose.Types.ObjectId(req.params.auctionID),
  })
    .populate("idPainting")
    .exec();
  // loop auction
  for (let i = 0; i < getAuctions.length; i++) {
    const auction = getAuctions[i].toJSON();
    if (auction.startDate > new Date()) {
      auction.status = "coming-soon";
      time = auction.startDate - new Date();
      auction.timeLeft = time;
    }
    if (auction.startDate <= new Date()) {
      auction.status = "live";
      auction.timeLeft = auction.endDate - new Date();
    }
    if (auction.endDate <= new Date()) auction.status = "over";

    const bid = await Bid.find({ auction: auction._id })
      .sort({ amount: -1 })
      .limit(1)
      .exec();
    if (bid.length > 0) {
      auction.highestBid = bid[0].amount;
    } else {
      auction.highestBid = auction.startingPrice;
    }

    const seller = await Seller.findById(auction.owner).exec();
    auction.owner = {
      name: seller.name,
      image: seller.image,
    };

    getAuctions[i] = auction;
  }

  return res.status(200).json(getAuctions);
};

exports.getAuctionsController = async (req, res) => {
  // additional data helper function
  function appendAdditionalData(doc) {
    const auction = doc.toJSON();
    if (auction.startDate > new Date()) auction.status = "scheduled";
    if (auction.startDate <= new Date()) auction.status = "ongoing";
    if (auction.endDate <= new Date()) auction.status = "over";

    return auction;
  }

  // direct get
  const id = req.params.auctionID;
  if (id) {
    if (id.length != 24) res.status(404).json({ message: "Auction not found" });
    Auction.findById(id)
      .exec()
      .then((doc) => {
        if (!doc) res.status(404).json({ message: "Auction not found" });
        else {
          // additional data
          const auction = appendAdditionalData(doc);
          res.status(200).json(auction);
        }
      });

    return;
  }

  // filter query
  const { status } = req.query;
  const filter = {};
  if (status) {
    switch (status) {
      case "scheduled":
        filter.startDate = { $gt: new Date() };
        break;
      case "ongoing":
        filter.startDate = { $lt: new Date() };
        filter.endDate = { $gt: new Date() };
        break;
      case "over":
        filter.endDate = { $lt: new Date() };
        break;
      default:
        break;
    }
  }

  // get auctions
  const auctionsDocument = await Auction.find(filter);

  // append additional data
  const auctions = auctionsDocument.map((auction) =>
    appendAdditionalData(auction)
  );

  return res.status(200).json(auctions);
};

exports.removeAuctionsController = async (req, res) => {
  const id = req.params.auctionID;
  const { userid } = req.body;

  // authorization if needed

  // find auction and check if its ongoing
  if (id.length != 24) res.status(404).json({ message: "Auction not found" });
  try {
    const auction = await Auction.findById(id);
    if (!auction) return res.status(404).json({ message: "Auction not found" });

    // reject if not owner
    if (!auction.owner.equals(new mongoose.Types.ObjectId(userid)))
      return res.status(403).json({ message: "Unauthorized" });

    // reject if ongoing
    if (auction.startDate <= new Date() && auction.endDate > new Date())
      return res.status(403).json({ message: "Auction already started" });
  } catch {
    return res.status(404).json({ message: "Auction not found" });
  }

  // delete the auction
  try {
    await Auction.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Auction deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Auction not found" });
  }
};

exports.addBidController = async (req, res) => {
  const id = req.params.auctionID;
  const { userid, amount } = req.body;
  try {
    const bid = await Bid({
      bidder: userid,
      auction: id,
      amount: amount,
    });

    const savedBid = await bid.save();

    const updatedAuction = await Auction.findByIdAndUpdate(
      id,
      { $push: { bids: savedBid._id } },
      { new: true }
    );

    const customer = await Customer.findByIdAndUpdate(userid, {
      $inc: { balance: -amount },
    });

    return res.status(200).json({
      success: true,
      data: updatedAuction,
      customer: customer,
      message: "Bid successful",
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Auction not found" });
  }
};

exports.setBidController = async (req, res) => {
  const { userid, amount } = req.body;
  const idAuction = req.params.auctionID;

  const auction = await Auction.findById(idAuction);

  if (amount < auction.startingPrice) {
    return res.status(400).json({ message: "Invalid bid amount." });
  }

  const bid = await Bid.create({
    bidder: userid,
    auction: idAuction,
    amount: amount,
  });

  const updatedAuction = await Auction.findByIdAndUpdate(
    idAuction,
    { $push: { bids: bid._id } },
    { new: true }
  );

  return res.status(200).json({
    success: true,
    data: updatedAuction,
    message: "Bid successful",
  });
};
