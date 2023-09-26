const express = require("express");
const { createInsurance } = require("../controllers/insuranceController");
const { getInsuranceById } = require("../controllers/insuranceController");
const router = express.Router();

router.post("/create/insurance", createInsurance);
router.get("/get-insurance/:insuranceId", getInsuranceById);

module.exports = router;