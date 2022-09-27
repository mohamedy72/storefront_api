import { client } from "../database";
import { NextFunction } from "express";
import bcrypt from "bcrypt";

const pepper = process.env.BCRYPT_SECRET;
const saltRounds = process.env.SALT_ROUNDS;
export interface User {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

// Signup
export const userSignup = async (
  user: User,
  next: NextFunction
): Promise<User | void> => {
  try {
    const connection = await client.connect();
    const sql =
      "INSERT INTO users(first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *";
    const hashed = bcrypt.hashSync(
      user.password + pepper,
      parseInt(saltRounds as string)
    );
    const response = await connection.query(sql, [
      user.firstName,
      user.lastName,
      user.username,
      hashed,
    ]);
    connection.release();
    return response.rows[0];
  } catch (error) {
    return next(error);
  }
};

// Signin
export const userSignin = async (
  username: string,
  password: string,
  next: NextFunction
): Promise<User | null> => {
  const connection = await client.connect();
  const sql = "SELECT password FROM users WHERE username=$1";
  const response = await connection.query(sql, [username]);
  const signedUser = response.rows[0];
  if (
    !response.rows.length ||
    !bcrypt.compareSync(password + pepper, signedUser.password)
  ) {
    return null;
  }
  return signedUser as User;
};

// Index all
// export const getAllUsers = async () => {
//   try {
//     const connection = await client.connect();
//     const sql = "SELECT * FROM users";
//     const response = await connection.query(sql);
//     connection.release();
//     return response.rows;
//   } catch (error) {
//     throw new Error(`Cannot retrieve the list of users, ${error}`);
//   }
// };

// Show a user
