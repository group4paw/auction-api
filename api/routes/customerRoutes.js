const express = require("express");
const { createCustomer } = require("../controllers/customerController");
const { customerSignIn } = require("../controllers/customerController");
const { customerSignUp } = require("../controllers/customerController");
const router = express.Router();

router.post("/create", createCustomer);
router.post("/sigin", customerSignIn);
router.post("/signup", customerSignUp);

module.exports = router;