import express from "express";
import { indexAllProducts } from '../handlers/productController'

const productsRouter = express.Router()

productsRouter.route('/').get(indexAllProducts)

export default productsRouter