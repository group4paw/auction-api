const express = require("express");
const { createDelivery } = require("../controllers/deliveryController");
const { updateOngkirById } = require("../controllers/deliveryController");
const { getDeliveryById } = require("../controllers/deliveryController");
const router = express.Router();

router.post("/create/delivery", createDelivery);
router.put("/update-ongkir/:deliveryId", updateOngkirById);
router.get("/get-delivery/:deliveryId", getDeliveryById);

module.exports = router;