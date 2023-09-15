const express = require("express");
const router = express.Router();

const { registerController } = require("../controllers/User.js");

// Register User
router.post("/register", registerController);

module.exports = router;
