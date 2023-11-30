const express = require("express");
const {
  createOrder,
  getOrderBySellerId,
  getOrderByBuyerId,
  checkoutOrder,
  refundBalance,
  getOrderById,
} = require("../controllers/Order");
const router = express.Router();

router.post("/", createOrder);
router.get("/seller/:id", getOrderBySellerId);
router.get("/buyer/:id", getOrderByBuyerId);
router.put("/checkout/:id", checkoutOrder);
router.put("/refund/:id", refundBalance);
router.get("/:id", getOrderById);
module.exports = router;
