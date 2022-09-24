import { Request, Response } from 'express'
import { Product, getAllProducts, addNewProduct } from '../models/product'

export const indexAllProducts = async (_req: Request, res: Response) => {
    const products = await getAllProducts()
    res.json({
        data: products
    })
}

export const createNewProduct = async (req: Request, res: Response) => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    }
    const newProduct = await addNewProduct(product)
    res.json({
        data: newProduct
    })

}