const Payment = require("../models/Payment");

exports.createPayment = async (req, res) => {
  const {
    idDelivery,
    idPainting,
    lastBidPrice,
    paymentDate,
    custBalance,
    sellerBalance,
    totalPurchase,
  } = req.body;
  try {
    const payment = await Payment.create({
      idDelivery,
      idPainting,
      lastBidPrice,
      paymentDate,
      custBalance,
      sellerBalance,
      totalPurchase,
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
      error: "Server Error",
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

exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    return res.status(200).json({
      success: true,
      data: payment,
      message: "Payment retrieved successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      error: "Payment not found",
    });
  }
};
