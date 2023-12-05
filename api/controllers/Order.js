const Order = require("../models/Order");
const Customer = require("../models/Customer");
const Seller = require("../models/Seller");
const Auction = require("../models/Auction");
const Painting = require("../models/Painting");

exports.createOrder = async (req, res) => {
  try {
    const {
      idAuction,
      idSeller,
      idCustomer,
      highestBid,
      title,
      image,
      expiredDate,
      idPainting,
    } = req.body;

    const auction = await Order.findOne({ idAuction: idAuction });
    if (auction) {
      res.status(500).json({
        success: false,
        error: "Order already exist",
      });
    } else {
      const sellerName = await Seller.findById(idSeller);
      const customerName = await Customer.findById(idCustomer);
      const painting = await Painting.findById(idPainting);
      const order = await Order.create({
        idAuction,
        idSeller,
        idCustomer,
        highestBid,
        title,
        image,
        expiredDate,
        idPainting,
        seller: sellerName.username,
        customer: customerName.username,
        addressFrom: painting.cityFrom,
      });

      res.status(200).json({
        success: true,
        order,
      });
    }
  } catch (error) {
    console.log(error);
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
  const { idCustomer, shipTo, phone, price } = req.body;
  try {
    const order = await Order.findById(req.params.id);
    if (order.idCustomer != idCustomer) {
      res.status(500).json({
        success: false,
        error: "You are not the buyer of this order",
      });
    }
    const seller = await Seller.findById(order.idSeller);
    const customer = await Customer.findById(idCustomer);
    if (customer.balance < price) {
      res.status(500).json({
        success: false,
        error: "Your balance is not enough",
      });
    }
    // reduce money from customer
    customer.balance -= price;
    await customer.save();

    // add money to seller
    seller.balance += price + order.highestBid;
    await seller.save();

    order.addressTo = shipTo;
    order.status = "Paid";
    order.phoneNumber = phone;
    order.totalPrice = price;
    await order.save();

    const buyer = await Customer.findById(idCustomer);
    res.status(200).json({
      success: true,
      buyer,
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
