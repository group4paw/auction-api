const express = require("express");
const { createDelivery } = require("../controllers/deliveryController");
const { updateOngkirById } = require("../controllers/deliveryController");
const { getDeliveryById } = require("../controllers/deliveryController");
const router = express.Router();

router.post("/create", createDelivery);
router.put("/:id/update-ongkir", updateOngkirById);
router.get("/:id", getDeliveryById);

module.exports = router;