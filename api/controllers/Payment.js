const Payment = require("../models/Payment");
const Delivery = require("../models/Delivery");
const Insurance = require("../models/Insurance");
const Seller = require("../models/Seller");
const Customer = require("../models/Customer");
const Topup = require("../models/Topup");

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

exports.topUpBalance = async (req, res) => {
  const { amount, userId } = req.body;

  let find = true;
  let order_id = "";

  while (find) {
    order_id =
      "topup" + "-" + Math.floor(100000000 + Math.random() * 900000000);
    const check = await Payment.findOne({ topupId: order_id });
    if (!check) {
      find = false;
    }
  }

  try {
    const userEmail = await Customer.findById(userId);

    const parameter = {
      transaction_details: {
        order_id: order_id,
        gross_amount: amount,
      },
      customer_details: {
        email: userEmail.email,
      },
    };

    const response = await fetch(process.env.MIDTRANS_URL || "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Basic ${process.env.MIDTRANS_SERVER_KEY_HASHED}}`,
      },
      body: JSON.stringify(parameter),
    });

    const result = await response.json();

    const payment = await Topup.create({
      idCustomer: userId,
      topupId: order_id,
      amount: amount,
    });

    return res.status(201).json({
      success: true,
      data: payment,
      token: result.token,
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

exports.updateBalance = async (req, res) => {
  const { orderId } = req.body;

  try {
    const payment = await Topup.findOneAndUpdate(
      { topupId: orderId },
      { status: "Success" }
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        error: "Payment not found",
      });
    }

    const customer = await Customer.findByIdAndUpdate(payment.idCustomer, {
      $inc: { balance: payment.amount },
    });

    return res.status(200).json({
      success: true,
      customer: customer,
      message: "Payment status updated to paid successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
