const express = require("express");

const {
  createPayment,
  getPayments,
  getPaymentsByStatus,
  getPaymentsByDate,
  updatePaymentToPaid,
  updatePaymentToFailed,
  getPaymentHistory,
} = require("../controllers/Payment");

const router = express.Router();

// Create Payment
router.post("/", createPayment);

// Get All Payments
router.get("/", getPayments);

// Params : UserId, Role
router.get("/:userId/:role", getPaymentHistory);

// Get Payment by Params : status
router.get("/status/:status", getPaymentsByStatus);

// Update payment status
router.put("/paid", updatePaymentToPaid);
router.put("/failed", updatePaymentToFailed);

// Get Payment by StartDate and EndDate
router.get("/date", getPaymentsByDate);

module.exports = router;
