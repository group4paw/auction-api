const express = require("express");
const { updateCustomerBalanceById } = require("../controllers/customerController");
const { customerSignIn } = require("../controllers/customerController");
const { customerSignUp } = require("../controllers/customerController");
const { getCustomerById } = require("../controllers/customerController");
const router = express.Router();

router.put("/:id/update-balance", updateCustomerBalanceById);
router.post("/signin", customerSignIn);
router.post("/signup", customerSignUp);
router.get("/:id", getCustomerById);

module.exports = router;