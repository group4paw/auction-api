const express = require("express");
const {
  createPainting,
  getPaintingsByUserId,
  deletePainting,
} = require("../controllers/Painting");
const { getPaintingById } = require("../controllers/Painting");
const {
  updatePaintingDescById,
  updatePainting,
} = require("../controllers/Painting");
const uploadMiddleware = require("../middleware/multer");
const router = express.Router();

router.post(
  "/create",
  uploadMiddleware.single("paintingsImage"),
  createPainting
);
router.put("/:id/update-desc", updatePaintingDescById);
router.get("/:id", getPaintingById);
router.get("/user/:userId", getPaintingsByUserId);
router.put("/:id/", uploadMiddleware.single("paintingsImage"), updatePainting);
router.delete("/:id", deletePainting);

module.exports = router;
