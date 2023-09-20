const express = require("express");
const { createPayment } = require("../controllers/Payment");
const router = express.Router();

// Register User
router.post("/payment", createPayment);
router.get("/payment", getPayments);
router.get("/payment/:id", getPaymentById);

module.exports = router;
