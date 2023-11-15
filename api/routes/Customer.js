const express = require("express");
const { updateCustomerBalanceById } = require("../controllers/Customer");
const { customerSignIn } = require("../controllers/Customer");
const { customerSignUp } = require("../controllers/Customer");
const { getCustomerById } = require("../controllers/Customer");
const { getInformationUser } = require("../controllers/Customer");
const router = express.Router();

router.put("/:id/update-balance", updateCustomerBalanceById);
router.post("/signin", customerSignIn);
router.post("/signup", customerSignUp);
router.get("/:id", getCustomerById);
router.get("/info/:id", getInformationUser);

module.exports = router;
