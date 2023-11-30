const Order = require("../models/Order");
const Customer = require("../models/Customer");
const Seller = require("../models/Seller");
const Auction = require("../models/Auction");

exports.createOrder = async (req, res) => {
  try {
    const { idAuction, idSeller, idCustomer, highestBid } = req.body;
    const order = await Order.create({
      idAuction,
      idSeller,
      idCustomer,
      highestBid,
    });
    await order.save();
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getOrderBySellerId = async (req, res) => {
  try {
    const order = await Order.find({ idSeller: req.params.id });
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getOrderByBuyerId = async (req, res) => {
  try {
    const order = await Order.find({ idCustomer: req.params.id });
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.checkoutOrder = async (req, res) => {
  const { idCustomer, shipTo } = req.body;
  try {
    const order = await Order.findById(req.params.id);
    if (order.idCustomer != idCustomer) {
      res.status(500).json({
        success: false,
        error: "You are not the buyer of this order",
      });
    }
    const seller = await Seller.findById(order.idSeller);

    // add money to seller
    seller.balance += order.highestBid;
    await seller.save();

    order.shipTo = shipTo;
    order.status = "Paid";
    await order.save();

    res.status(200).json({
      success: true,
      order,
      seller,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.refundBalance = async (req, res) => {
  const { id } = req.params;
  try {
    const auction = await Auction.findById(id).populate("bids").exec();
    const order = await Order.findOne({ idAuction: id });
    let bidder = auction.bids;

    bidder.map(async (bid) => {
      if (bid.amount != order.highestBid) {
        const customer = await Customer.findById(bid.idCustomer);
        customer.balance += bid.amount;
        await customer.save();
      }
    });

    res.status(200).json({
      success: true,
      auction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
