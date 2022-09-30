import { client } from "../database";

export const activeOrderByUser = async (id: number) => {
  try {
    const connection = await client.connect();
    const sql =
      "SELECT username, orders.id FROM users INNER JOIN orders ON users.id=orders.user_id WHERE orders.status='active' AND users.id=$1";
    const result = await connection.query(sql, [id]);
    connection.release();
    return result.rows;
  } catch (error) {
    return error;
  }
};
