const express = require("express");
const {
  createPayment,
  getPaymentsByStatus,
  getPaymentById,
  updatePayment,
  updatePaymentToPaid,
  updatePaymentToFailed,
  getPaymentsByDate,
} = require("../controllers/Payment");
const router = express.Router();

// Create Payment
router.post("/payment", createPayment);

// Get All Payments
router.get("/payment", getPayments);

// Params : UserId
// Body : Role
router.get("/payment/:userId", getPaymentById);

// Get Payment by Params : status
router.get("/payment/status/:status", getPaymentsByStatus);

// Update payment status
router.put("/payment/paid", updatePaymentToPaid);
router.put("/payment/failed", updatePaymentToFailed);

// Get Payment by StartDate and EndDate
router.get("/payments/date/:startDate/:endDate", getPaymentsByDate);

module.exports = router;
