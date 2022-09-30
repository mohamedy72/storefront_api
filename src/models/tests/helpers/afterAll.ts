import { client } from "../../../database";

afterAll(async () => {
  const connection = await client.connect();
  const sql = "DELETE FROM users; ALTER SEQUENCE users_id_seq RESTART WITH 1";
  await connection.query(sql);
  connection.release();
});
