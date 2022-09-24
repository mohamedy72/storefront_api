import express from "express";
import { indexAllProducts, createNewProduct } from '../handlers/productController'

const productsRouter = express.Router()

productsRouter.route('/').get(indexAllProducts).post(createNewProduct)

export default productsRouter