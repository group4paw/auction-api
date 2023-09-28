const express = require("express");
const { createPainting } = require("../controllers/paintingController");
const { getPaintingById } = require("../controllers/paintingController");
const { updatePaintingDescById } = require("../controllers/paintingController");
const router = express.Router();

router.post("/create", createPainting);
router.put("/:id/update-desc", updatePaintingDescById);
router.get("/:id", getPaintingById);

module.exports = router;