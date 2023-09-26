const express = require("express");
const { getSellerById } = require("../controllers/sellerController");
const { updateSellerBalanceById } = require("../controllers/sellerController");
const { sellerSignIn } = require("../controllers/sellerController");
const { sellerSignUp } = require("../controllers/sellerController");
const router = express.Router();

router.get("/:id", getSellerById);
router.post("/signin", sellerSignIn);
router.post("/signup", sellerSignUp);
router.put("/:id/update-balance", updateSellerBalanceById);

module.exports = router;