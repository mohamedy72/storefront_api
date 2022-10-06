import { client } from "../../database";
import supertest from "supertest";

import app from "../../server";
import { User, userSignup } from "../user";
import { addNewProduct, Product } from "../product";
import { addNewOrder, Order } from "../order";

const request = supertest(app);

describe("Testing API endpoints", () => {
  const user: User = {
    first_name: "hamed",
    last_name: "mohamed",
    username: "hamed_moh",
    password: "hmh5010",
  };

  const product: Product = {
    name: "Product sample 1",
    price: 400,
    category: "Shoes",
  };

  const order: Order = {
    product_key: 1,
    quantity: 10,
    user_key: 1,
    order_status: "active",
  };

  beforeAll(async () => {
    await userSignup(user);
    await addNewProduct(product);
    await addNewOrder(order);
  });

  describe("Testing Products endpoints", () => {
    it("returns 200 upon GET /api/products", async () => {
      const response = await request.get("/api/products");
      expect(response.status).toBe(200);
    });

    it("returns 200 upon POST to /api/products", async () => {
      const response = await request.post("/api/products");
      expect(response.status).toBe(200);
    });

    it("returns a signle product when passing a productId", async () => {
      const response = await request.get("/api/products/1");
      expect(response.status).not.toBe(404);
    });
    it("deletes a signle product when passing a productId", async () => {
      const response = await request.delete("/api/products/1");
      expect(response.status).not.toBe(404);
    });
    it("update a signle product when passing a productId", async () => {
      const response = await request.put("/api/products/1");
      expect(response.status).not.toBe(404);
    });
  });

  describe("Testing Users endpoints", () => {
    it("returns 500 upon GET /api/users without token", async () => {
      const response = await request.get("/api/users");
      expect(response.status).toBe(500);
    });

    it("returns 201 upon POST to /api/users/signup", async () => {
      const response = await request.post("/api/users/signup");
      expect(response.status).toBe(201);
    });

    it("returns a signle user when passing a userId", async () => {
      const response = await request
        .get("/api/users/1")
        .set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoiaGFtZWQiLCJsYXN0X25hbWUiOiJtb2hhbWVkIiwidXNlcm5hbWUiOiJoYW1lZF9tb2giLCJwYXNzd29yZCI6IiQyYiQxMiRQbWxIZ1hWck13OGZQa21LU09yNEpPSlJ5MDFiUU1PcUVsT1VGeGRKRXN2dzhibkRLa0haQyJ9LCJpYXQiOjE2NjQ2MzEyODN9.R3UFGE9ojBfgmtpecewvxcW5V__ndO1FpesiB_k-X1A"
        );

      expect(response.status).not.toBe(404);
    });

    it("update a signle user when passing a userId", async () => {
      const response = await request
        .put("/api/users/1")
        .set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoiaGFtZWQiLCJsYXN0X25hbWUiOiJtb2hhbWVkIiwidXNlcm5hbWUiOiJoYW1lZF9tb2giLCJwYXNzd29yZCI6IiQyYiQxMiRQbWxIZ1hWck13OGZQa21LU09yNEpPSlJ5MDFiUU1PcUVsT1VGeGRKRXN2dzhibkRLa0haQyJ9LCJpYXQiOjE2NjQ2MzEyODN9.R3UFGE9ojBfgmtpecewvxcW5V__ndO1FpesiB_k-X1A"
        );
      expect(response.status).not.toBe(404);
    });

    it("returns 404 when deleting a signle user when passing non-exist userId", async () => {
      const response = await request
        .delete("/api/users/1")
        .set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdF9uYW1lIjoiaGFtZWQiLCJsYXN0X25hbWUiOiJtb2hhbWVkIiwidXNlcm5hbWUiOiJoYW1lZF9tb2giLCJwYXNzd29yZCI6IiQyYiQxMiRQbWxIZ1hWck13OGZQa21LU09yNEpPSlJ5MDFiUU1PcUVsT1VGeGRKRXN2dzhibkRLa0haQyJ9LCJpYXQiOjE2NjQ2MzEyODN9.R3UFGE9ojBfgmtpecewvxcW5V__ndO1FpesiB_k-X1A"
        );
      expect(response.status).toBe(404);
    });
  });

  describe("Testing Orders endpoints", () => {
    it("returns 200 upon GET /api/orders", async () => {
      const response = await request.get("/api/orders");
      expect(response.status).toBe(200);
    });

    it("returns 200 upon POST to /api/orders", async () => {
      const response = await request.post("/api/orders");
      expect(response.status).toBe(200);
    });

    it("returns a signle order when passing a orderId", async () => {
      const response = await request.get("/api/orders/1");
      expect(response.status).not.toBe(404);
    });

    it("returns 404 when passing non-existent productId", async () => {
      const response = await request.delete("/api/orders/1");
      expect(response.status).toBe(404);
    });
  });

  afterAll(async () => {
    const connection = await client.connect();
    const sql =
      "delete from products; alter sequence products_product_id_seq restart with 1; delete from users; alter sequence users_user_id_seq restart with 1; delete from orders; alter sequence orders_order_id_seq restart with 1;";
    await connection.query(sql);
    connection.release();
  });
});
