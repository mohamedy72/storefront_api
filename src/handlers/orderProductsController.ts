import { Request, Response } from "express";
import {
  OrderProducts,
  deleteSingleOrderProducts,
  addPorductToOrder,
  getAllOrderProducts,
  getSingleOrderProducts,
  overrideSingleOrderProducts,
} from "../models/order_products";

export const indexAllOrderProducts = async (req: Request, res: Response) => {
  try {
    const results = await getAllOrderProducts();
    res.status(200).json({
      data: results,
    });
  } catch (error) {
    res.status(404).json({
      data: error,
    });
  }
};

export const createNewProductInOrder = async (req: Request, res: Response) => {
  try {
    const { quantity, product_key, order_key }: OrderProducts = req.body;
    const result = await addPorductToOrder({
      quantity,
      product_key,
      order_key,
    });
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      data: error,
    });
  }
};

export const indexSingleOrderProducts = async (req: Request, res: Response) => {
  try {
    const id = +req.params.orderProductId;
    const result = await getSingleOrderProducts(id);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      data: error,
    });
  }
};
export const removeSingleOrderProducts = async (
  req: Request,
  res: Response
) => {
  try {
    const id = +req.params.orderProductId;
    const result = await deleteSingleOrderProducts(id);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      data: error,
    });
  }
};

export const updateSingleOrderProduct = async (req: Request, res: Response) => {
  try {
    const id = +req.params.orderProductId;
    const newQuantity = req.body.quantity;
    const results = await overrideSingleOrderProducts(id, newQuantity);
    res.status(200).json({
      data: results,
    });
  } catch (error) {
    res.status(404).json({
      data: error,
    });
  }
};
