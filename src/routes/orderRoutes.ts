import express from "express";
import {
  createNewOrder,
  indexAllOrders,
  indexSingleOrder,
} from "../handlers/orderController";

import {
  indexAllOrderProducts,
  createNewProductInOrder,
} from "../handlers/orderProductsController";

const ordersRouter = express.Router();
ordersRouter.route("/").get(indexAllOrders).post(createNewOrder);
ordersRouter.route("/:orderId").get(indexSingleOrder);

ordersRouter
  .route("/:orderId/products")
  .get(indexAllOrderProducts)
  .post(createNewProductInOrder);

export default ordersRouter;
