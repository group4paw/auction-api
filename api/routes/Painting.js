const express = require("express");
const { createPainting } = require("../controllers/Painting");
const { getPaintingById } = require("../controllers/Painting");
const { updatePaintingDescById } = require("../controllers/Painting");
const uploadMiddleware = require("../middleware/multer");
const router = express.Router();

router.post(
  "/create",
  uploadMiddleware.single("paintingsImage"),
  createPainting
);
router.put("/:id/update-desc", updatePaintingDescById);
router.get("/:id", getPaintingById);

module.exports = router;
