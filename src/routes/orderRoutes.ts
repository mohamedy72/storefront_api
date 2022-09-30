import express from "express";
import {
  insertPorductInOrder,
  createNewOrder,
  indexAllOrders,
  indexSingleOrder,
} from "../handlers/orderController";

const ordersRouter = express.Router();
ordersRouter.route("/").get(indexAllOrders);
ordersRouter.route("/").post(createNewOrder);
ordersRouter.route("/:orderId").get(indexSingleOrder);
ordersRouter.route("/:orderId/products").post(insertPorductInOrder);
// ordersRouter.route("/:id/products").post();
// /users/:userID/orders/:orderID/products

export default ordersRouter;