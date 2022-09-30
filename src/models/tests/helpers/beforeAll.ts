import { client } from "../../../database";

beforeAll(async () => {
  const connection = await client.connect();
  const sql =
    "delete from products; alter sequence products_id_seq restart with 1; delete from users; alter sequence users_id_seq restart with 1; delete from orders; alter sequence orders_id_seq restart with 1; ";
  await connection.query(sql);
  connection.release();
});
