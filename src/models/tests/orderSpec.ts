import { client } from "../../database";
import {
  addNewOrder,
  deleteSingleOrder,
  getAllOrders,
  getSingleOrder,
  Order,
} from "../order";
import { addNewProduct, Product } from "../product";
import { User, userSignup } from "../user";

describe("Orders should include all/almostAll CRUD methods", () => {
  it("should include CREATE method", () => {
    expect(addNewOrder).toBeDefined();
  });
  it("should include READ/INDEX method", () => {
    expect(getAllOrders).toBeDefined();
  });

  it("should include DELETE method", () => {
    expect(deleteSingleOrder).toBeDefined();
  });
});

describe("Orders CRUD functionality are working as expected", () => {
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

  beforeAll(async () => {
    await userSignup(user);
    await addNewProduct(product);
  });

  it("should return list of orders", async () => {
    const response = await getAllOrders();
    expect(response).toEqual([]);
  });

  it("should add new order to the list of orders", async () => {
    const newOrder: Order = {
      product_id: 1,
      quantity: 10,
      user_id: 1,
      order_status: "active",
    };

    const response = await addNewOrder(newOrder);

    expect(response).toEqual({
      id: 1,
      product_id: 1,
      quantity: 10,
      user_id: 1,
      order_status: "active",
    });
  });

  it("should show a single product", async () => {
    const response = await getSingleOrder(1);
    expect(response).not.toBeFalse();
  });

  it("should delete a product", async () => {
    await deleteSingleOrder(1);
    const result = await getAllOrders();
    expect(result).toEqual([]);
  });

  afterAll(async () => {
    const connection = await client.connect();
    const sql =
      "delete from products; alter sequence products_id_seq restart with 1; delete from users; alter sequence users_id_seq restart with 1; delete from orders; alter sequence orders_id_seq restart with 1; ";
    await connection.query(sql);
    connection.release();
  });
});
