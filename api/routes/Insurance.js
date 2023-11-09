const express = require("express");
const { createInsurance } = require("../controllers/Insurance");
const { getInsuranceById } = require("../controllers/Insurance");
const router = express.Router();

router.post("/create", createInsurance);
router.get("/:id", getInsuranceById);

module.exports = router;
