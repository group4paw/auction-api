const express = require("express");
const { createPainting } = require("../controllers/paintingController");
const router = express.Router();

router.post("/create", createPainting);

module.exports = router;