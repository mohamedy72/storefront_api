import { Request, Response } from "express";

import {
  getAllOrders,
  getSingleOrder,
  addNewOrder,
  Order,
} from "../models/order";

export const indexAllOrders = async (req: Request, res: Response) => {
  try {
    const results = await getAllOrders();
    res.status(200).json({
      data: results,
    });
  } catch (error) {
    res.status(400).json({
      data: `Can't retrieve a list of orders ${error}`,
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
      data: `Can't retrieve an order with this id, ${error}`,
    });
  }
};

export const createNewOrder = async (req: Request, res: Response) => {
  try {
    const newOrder: Order = {
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
