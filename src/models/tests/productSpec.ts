import { client } from "../../database";
import {
  getAllProducts,
  addNewProduct,
  getSingleProduct,
  overrideSingleProduct,
  deleteSingleProduct,
} from "../product";

describe("Should include all CRUD methods", () => {
  it("should include CREATE method", () => {
    expect(addNewProduct).toBeDefined();
  });
  it("should include READ/INDEX method", () => {
    expect(getAllProducts).toBeDefined();
  });
  it("should include UPDATE method", () => {
    expect(overrideSingleProduct).toBeDefined();
  });
  it("should include DELETE method", () => {
    expect(deleteSingleProduct).toBeDefined();
  });
});

describe("ALL CRUD functionality are working as expected", () => {
  it("should return list of products", async () => {
    const response = await getAllProducts();
    expect(response).toEqual([]);
  });

  it("should add new product to the list of products", async () => {
    const response = await addNewProduct({
      name: "Product test 1",
      price: 1500,
      category: "Sports",
    });
    expect(response).toEqual({
      id: 1,
      name: "Product test 1",
      price: 1500,
      category: "Sports",
    });
  });

  it("should show a single product", async () => {
    const response = await getSingleProduct(1);
    expect(response).not.toBeFalse();
  });

  it("should delete a product", async () => {
    await deleteSingleProduct(1);
    const result = await getAllProducts();
    expect(result).toEqual([]);
  });

  afterAll(async () => {
    const connection = await client.connect();
    const sql =
      "DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n";
    await connection.query(sql);
    connection.release();
  });
});
