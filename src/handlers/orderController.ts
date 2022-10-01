import { Request, Response } from "express";

import {
  getAllOrders,
  getSingleOrder,
  addPorductToOrder,
  addNewOrder,
} from "../models/order";

export const indexAllOrders = async (req: Request, res: Response) => {
  try {
    const results = await getAllOrders();
    res.status(200).json({
      data: results,
    });
  } catch (error) {
    res.status(400).json({
      data: "Can't retrieve a list of orders",
    });
  }
};

export const indexSingleOrder = async (req: Request, res: Response) => {
  try {
    const result = await getSingleOrder(+req.params.orderId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      data: `Can't retrieve a list of orders, ${error}`,
    });
  }
};

export const createNewOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = {
      product_key: req.body.product_key,
      quantity: req.body.quantity,
      user_key: req.body.user_key,
      order_status: req.body.order_status,
    };
    const result = await addNewOrder(newOrder);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      data: `Can't add new order, ${error}`,
    });
  }
};

export const insertPorductInOrder = async (req: Request, res: Response) => {
  try {
    const orderId = +req.params.orderId;
    const quantity: number = req.body.quantity;
    const productId: number = req.body.productId;

    const result = await addPorductToOrder(orderId, quantity, productId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      data: `Cannot retrieve the order with this id, ${error}`,
    });
  }
};
