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
    sellerId,
    customerId,
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
      sellerId,
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
  const { role } = req.body;
  const { userId } = req.params;

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
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, {
      status: "Paid",
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
  const { startDate, endDate } = req.query;

  try {
    const payments = await Payment.find({
      paymentDate: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
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
