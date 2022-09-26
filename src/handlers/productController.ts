import { Request, Response } from "express";
import {
  Product,
  getAllProducts,
  addNewProduct,
  getSingleProduct,
  deleteSingleProduct,
  overrideSingleProduct,
} from "../models/product";

export const indexAllProducts = async (_req: Request, res: Response) => {
  const products = await getAllProducts();
  res.json({
    data: products,
  });
};

export const createNewProduct = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  const newProduct = await addNewProduct(product);
  res.json({
    data: newProduct,
  });
};

export const indexSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = +req.params.productId;
    const singleProduct = await getSingleProduct(id);
    res.status(200).json({
      data: singleProduct,
    });
  } catch (error) {
    res.status(400).json({
      data: error,
    });
  }
};

export const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = +req.params.productId;
    const updatedProduct: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const singleProduct = await overrideSingleProduct(updatedProduct, id);
    res.status(200).json({
      data: singleProduct,
    });
  } catch (error) {
    res.status(400).json({
      data: error,
    });
  }
};
export const removeSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = +req.params.productId;
    const singleProduct = await deleteSingleProduct(id);
    res.status(200).json({
      data: singleProduct,
    });
  } catch (error) {
    res.status(400).json({
      data: error,
    });
  }
};
