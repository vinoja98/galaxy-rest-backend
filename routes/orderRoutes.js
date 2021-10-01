const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/orderController");

orderRouter.post("/", orderController.addOrder);
orderRouter.get("/:idNumber", orderController.getOrdersById);
orderRouter.get("/", orderController.getOrders);
orderRouter.post("/update/:id", orderController.updateOrder);

module.exports = orderRouter;
