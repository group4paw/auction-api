const Payment = require("../models/Payment");
const Delivery = require("../models/Delivery");
const Insurance = require("../models/Insurance");
const Seller = require("../models/Seller");
const Customer = require("../models/Customer");

exports.createPayment = async (req, res) => {
  const {
    idDelivery,
    idPainting,
    idInsurance,
    lastBidPrice,
    sellerId,
    customerId,
  } = req.body;

  const delivery = await Delivery.findById(idDelivery);
  const insurance = await Insurance.findById(idInsurance);
  let totalPurchase = lastBidPrice + delivery.ongkir + insurance.insurancePrice;
  try {
    const payment = await Payment.create({
      idDelivery,
      idPainting,
      lastBidPrice,
      idInsurance,

      sellerId,
      totalPurchase,
      customerId,
    });

    return res.status(201).json({
      success: true,
      data: payment,
      message: "Payment created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    return res.status(200).json({
      success: true,
      data: payments,
      message: "Payments retrieved successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getPaymentHistory = async (req, res) => {
  const { userId, role } = req.params;

  const query = {};

  if (role === "Customer") {
    query.customerId = userId;
  } else if (role === "Seller") {
    query.sellerId = userId;
  }

  try {
    const payments = await Payment.find(query);

    return res.status(200).json({
      success: true,
      data: payments,
      message: "Payment history retrieved successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updatePaymentToFailed = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, {
      status: "Failed",
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        error: "Payment not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: payment,
      message: "Payment status updated to failed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updatePaymentToPaid = async (req, res) => {
  const { paymentId } = req.body;

  try {
    const payment = await Payment.findByIdAndUpdate(paymentId, {
      status: "Paid",
    });

    const { totalPurchase, sellerId, customerId } = payment;

    const seller = await Seller.findByIdAndUpdate(sellerId, {
      $inc: { sellerBalance: totalPurchase },
    });

    const customer = await Customer.findByIdAndUpdate(customerId, {
      $inc: { custBalance: -totalPurchase },
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        error: "Payment not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: payment,
      message: "Payment status updated to paid successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getPaymentsByStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const payments = await Payment.find({ status });

    return res.status(200).json({
      success: true,
      data: payments,
      message: "Payments retrieved successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getPaymentsByDate = async (req, res) => {
  const { startDate, endDate } = req.body;

  const userId = req.headers["user-id"];
  const role = req.headers["role"];

  const query = {};

  if (role === "Customer") {
    query.customerId = userId;
  } else if (role === "Seller") {
    query.sellerId = userId;
  }

  try {
    const payments = await Payment.find({
      paymentDate: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
      ...query,
    });

    return res.status(200).json({
      success: true,
      data: payments,
      message: "Payments retrieved successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
