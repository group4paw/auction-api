const express = require("express");
const { createSeller } = require("../controllers/sellerController");
const { sellerSignIn } = require("../controllers/sellerController");
const { sellerSignUp } = require("../controllers/sellerController");
const router = express.Router();

router.post("/seller", createSeller);
router.post("/sigin", sellerSignIn);
router.post("/signup", sellerSignUp);

module.exports = router;