const express = require("express");
const { getSellerById } = require("../controllers/Seller");
const { updateSellerBalanceById } = require("../controllers/Seller");
const { sellerSignIn } = require("../controllers/Seller");
const { sellerSignUp } = require("../controllers/Seller");
const router = express.Router();

router.get("/:id", getSellerById);
router.post("/signin", sellerSignIn);
router.post("/signup", sellerSignUp);
router.put("/:id/update-balance", updateSellerBalanceById);

module.exports = router;
