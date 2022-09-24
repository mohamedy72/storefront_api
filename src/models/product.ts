import client from '../database';

export interface Product {
    name: string;
    price: number;
    category?: string
}


export const getAllProducts = async (): Promise<Product[]> => {
    try {
        const connection = await client.connect()
        const sql = `SELECT * FROM products;`
        const result = await connection.query(sql)
        connection.release()
        return result.rows
    } catch (error) {
        throw new Error("Error happened")
    }
}
export const addNewProduct = async (product: Product): Promise<Product> => {
    try {
        const sql = 'INSERT INTO products(name, price, category) VALUES($1, $2, $3) RETURNING *'
        const connection = await client.connect();
        const result = await connection.query(sql, [product.name, product.price, product.category])
        connection.release()
        return result.rows[0]
    } catch (err) {
        throw new Error(`Couldn't add new product!. Error happened: ${err}`)
    }
}