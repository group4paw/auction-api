const express = require("express");
const { createCustomer } = require("../controllers/customerController");
const router = express.Router();

router.post("/customer", createCustomer);

module.exports = router;