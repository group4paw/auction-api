const express = require("express");
const {
  createInsurance,
  getAllInsurance,
} = require("../controllers/Insurance");
const { getInsuranceById } = require("../controllers/Insurance");
const router = express.Router();

router.post("/", createInsurance);
router.get("/:id", getInsuranceById);
router.get("/", getAllInsurance);

module.exports = router;
