import { client } from "../database";

export interface Order {
  id?: number;
  product_id: number;
  quantity: number;
  user_id: number;
  order_status: "active" | "completed";
}

export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const connection = await client.connect();
    const sql = `SELECT * FROM orders;`;
    const result = await connection.query(sql);
    connection.release();
    return result.rows;
  } catch (error) {
    throw new Error(`Cannot get all orders, ${error}`);
  }
};
export const getSingleOrder = async (id: number): Promise<Order> => {
  try {
    const connection = await client.connect();
    const sql = `SELECT * FROM orders WHERE id=$1;`;
    const result = await connection.query(sql, [id]);
    connection.release();
    return result.rows[0];
  } catch (error) {
    throw new Error(`Cannot get an order with id ${id}, ${error}`);
  }
};

export const addNewOrder = async (order: Order): Promise<Order | unknown> => {
  try {
    const connection = await client.connect();
    const sql =
      "insert into orders(product_id, quantity, user_id, order_status ) values ($1, $2, $3, $4) returning *";
    const result = await connection.query(sql, [
      order.product_id,
      order.quantity,
      order.user_id,
      order.order_status,
    ]);
    console.log(result);
    connection.release();
    return result.rows[0];
  } catch (error) {
    return error;
  }
};

export const deleteSingleOrder = async (id: number) => {
  try {
    const connection = await client.connect();
    const sql = "DELETE FROM orders WHERE id=$1";
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
