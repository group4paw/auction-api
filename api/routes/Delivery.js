const express = require("express");
const { createDelivery } = require("../controllers/Delivery");
const { updateOngkirById } = require("../controllers/Delivery");
const { getDeliveryById } = require("../controllers/Delivery");
const router = express.Router();

router.post("/create", createDelivery);
router.put("/:id/update-ongkir", updateOngkirById);
router.get("/:id", getDeliveryById);

module.exports = router;
