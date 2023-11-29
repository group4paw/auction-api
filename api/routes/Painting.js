const express = require("express");
const {
  createPainting,
  getPaintingsByUserId,
  deletePainting,
} = require("../controllers/Painting");
const { getPaintingById } = require("../controllers/Painting");
const { updatePaintingDescById } = require("../controllers/Painting");
const router = express.Router();

router.post("/create", createPainting);
router.put("/:id/update-desc", updatePaintingDescById);
router.get("/:id", getPaintingById);
router.get("/user/:userId", getPaintingsByUserId);
router.delete("/:id", deletePainting);

module.exports = router;
