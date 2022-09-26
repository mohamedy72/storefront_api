import { client } from "../database";

export interface Product {
  name: string;
  price: number;
  category?: string;
}

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const connection = await client.connect();
    const sql = `SELECT * FROM products;`;
    const result = await connection.query(sql);
    connection.release();
    return result.rows;
  } catch (error) {
    throw new Error(`Cannot get all products, ${error}`);
  }
};
export const addNewProduct = async (
  product: Product
): Promise<Product | unknown> => {
  try {
    const sql =
      "INSERT INTO products(name, price, category) VALUES($1, $2, $3) RETURNING *";
    const connection = await client.connect();
    const result = await connection.query(sql, [
      product.name,
      product.price,
      product.category,
    ]);
    connection.release();
    return result.rows[0];
  } catch (err) {
    throw new Error(`Couldn't add new product!. Error happened: ${err}`);
  }
};

export const getSingleProduct = async (id: number): Promise<Product> => {
  try {
    const connection = await client.connect();
    const sql = "SELECT * FROM products WHERE id=$1";
    const result = await connection.query(sql, [id]);
    connection.release();
    return result.rows[0];
  } catch (error) {
    throw new Error(`Cannot get the product with id: ${id}, ${error}`);
  }
};

export const overrideSingleProduct = async (
  updatedProduct: Product,
  id: number
): Promise<Product> => {
  try {
    const connection = await client.connect();
    const sql =
      "UPDATE products SET name=$1, price=$2, category=$3 WHERE id=$4";
    const result = await connection.query(sql, [
      updatedProduct.name,
      updatedProduct.price,
      updatedProduct.category,
      id,
    ]);
    connection.release();
    return result.rows[0];
  } catch (error) {
    throw new Error(`Cannot get the product with id: ${id}, ${error}`);
  }
};

export const deleteSingleProduct = async (id: number): Promise<Product> => {
  try {
    const connection = await client.connect();
    const sql = "DELETE FROM products WHERE id=$1";
    const result = await connection.query(sql, [id]);
    connection.release();
    return result.rows[0];
  } catch (error) {
    throw new Error(`Cannot delete the product with id: ${id}, ${error}`);
  }
};
