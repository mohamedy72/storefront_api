import { client } from "../database";

export interface OrderProducts {
  orderProduct_id?: number;
  quantity: number;
  product_key: number;
  order_key: number;
}

export const getAllOrderProducts = async (): Promise<
  OrderProducts[] | unknown
> => {
  try {
    const connection = await client.connect();
    const sql = "SELECT * FROM order_products";
    const results = await connection.query(sql);
    connection.release();
    return results.rows;
  } catch (error) {
    return error;
  }
};

export const addPorductToOrder = async (
  product: OrderProducts
): Promise<OrderProducts | unknown> => {
  try {
    const connection = await client.connect();
    const sql =
      "insert into order_products (quantity, product_key, order_key) values ($1,$2,$3) RETURNING *";
    const result = await connection.query(sql, [
      product.quantity,
      product.product_key,
      product.order_key,
    ]);
    connection.release();
    return result.rows[0];
  } catch (error) {
    return error;
  }
};

export const getSingleOrderProducts = async (
  id: number
): Promise<OrderProducts | unknown> => {
  try {
    const connection = await client.connect();
    const sql = "SELECT * FROM order_products WHERE orderproducts_id=$1";
    const results = await connection.query(sql, [id]);
    connection.release();
    return results.rows[0];
  } catch (error) {
    return error;
  }
};

export const deleteSingleOrderProducts = async (
  id: number
): Promise<OrderProducts | unknown> => {
  try {
    const connection = await client.connect();
    const sql = "DELETE FROM order_products WHERE orderproducts_id=$1";
    const results = await connection.query(sql, [id]);
    connection.release();
    return results.rows[0];
  } catch (error) {
    return error;
  }
};
export const overrideSingleOrderProducts = async (
  id: number,
  quantity: number
): Promise<OrderProducts | unknown> => {
  try {
    const connection = await client.connect();
    const sql =
      "UPDATE order_products SET quantity=$2 WHERE orderproducts_id=$1";
    const results = await connection.query(sql, [id, quantity]);
    connection.release();
    return results.rows[0];
  } catch (error) {
    return error;
  }
};
