import { Request, Response } from 'express'
import { getAllProducts } from '../models/product'

export const indexAllProducts = async (_req: Request, res: Response) => {
    const products = await getAllProducts()
    res.json(products)
}