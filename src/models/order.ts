import { client } from "../database";

export interface Order {
  id?: number;
  product_key: number;
  quantity: number;
  user_key: number;
  order_status: "active" | "completed";
}

export const getAllOrders = async (): Promise<Order[] | unknown> => {
  try {
    const connection = await client.connect();
    const sql = `SELECT * FROM orders;`;
    const result = await connection.query(sql);
    connection.release();
    return result.rows;
  } catch (error) {
    return error;
  }
};
export const getSingleOrder = async (id: number): Promise<Order | unknown> => {
  try {
    const connection = await client.connect();
    const sql = `SELECT * FROM orders WHERE order_id=$1;`;
    const result = await connection.query(sql, [id]);
    connection.release();
    return result.rows[0];
  } catch (error) {
    return error;
  }
};

export const addNewOrder = async (order: Order): Promise<Order | unknown> => {
  try {
    const connection = await client.connect();
    const sql =
      "insert into orders(product_key, quantity, user_key, order_status ) values ($1, $2, $3, $4) returning *";
    const result = await connection.query(sql, [
      order.product_key,
      order.quantity,
      order.user_key,
      order.order_status,
    ]);
    connection.release();
    return result.rows[0];
  } catch (error) {
    return error;
  }
};

export const deleteSingleOrder = async (
  id: number
): Promise<Order | unknown> => {
  try {
    const connection = await client.connect();
    const sql = "DELETE FROM orders WHERE order_id=$1";
    const result = await connection.query(sql, [id]);
    connection.release();
    return result.rows[0];
  } catch (error) {
    return error;
  }
};

// Add new product to an order
export const addPorductToOrder = async (
  orderId: number,
  quantity: number,
  productId: number
): Promise<Order | unknown> => {
  try {
    const connection = await client.connect();
    const sql =
      "insert into order_products (quantity, order_id, product_id) values ($1,$2,$3) RETURNING *";
    const result = await connection.query(sql, [quantity, orderId, productId]);
    const order = result.rows[0];
    connection.release();
    return order;
  } catch (error) {
    return error;
  }
};
