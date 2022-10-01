import express from "express";
import {
  indexAllProducts,
  createNewProduct,
  indexSingleProduct,
  removeSingleProduct,
  updateSingleProduct,
} from "../handlers/productController";

const productsRouter = express.Router();

productsRouter.route("/").get(indexAllProducts).post(createNewProduct);
productsRouter
  .route("/:productId")
  .get(indexSingleProduct)
  .delete(removeSingleProduct)
  .put(updateSingleProduct);

export default productsRouter;
