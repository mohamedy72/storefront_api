import client from '../database';

export interface Product {
    id: number;
    name: string;
    type: string;
    weight: number
}


export const getAllProducts = async (): Promise<Product[]> => {
    try {
        const connection = await client.connect()
        console.log("Connection successfully!");
        const sql = `SELECT * FROM products`
        const result = await connection.query(sql)
        connection.release()
        return result.rows
    } catch (error) {
        throw new Error("Error happened")
    }
}
// export const addNewProduct = async (): Promise<> => {
//     try {
//         const connection = await client.connect()
//     } catch (err) {
//         throw new Error(`Couldn't add new product!. Error happened: ${err}`)
//     }
// }