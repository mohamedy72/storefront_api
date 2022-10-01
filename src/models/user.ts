import { client } from "../database";
import { NextFunction } from "express";
import bcrypt from "bcrypt";

const pepper = process.env.BCRYPT_SECRET;
const saltRounds = process.env.SALT_ROUNDS;
export interface User {
  user_id?: number;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}

/**
 * ============= CRUD model =============
 */

// Index all
export const getAllUsers = async (): Promise<User[] | unknown> => {
  try {
    const connection = await client.connect();
    const sql = "SELECT * FROM users";
    const response = await connection.query(sql);
    connection.release();
    return response.rows;
  } catch (error) {
    return error;
  }
};

// Show a user
export const getSingleUser = async (id: number): Promise<User | unknown> => {
  try {
    const connection = await client.connect();
    const sql = "SELECT * FROM users WHERE userId=$1";
    const response = await connection.query(sql, [id]);
    connection.release();
    return response.rows[0];
  } catch (error) {
    return error;
  }
};

// Delete a user
export const deleteSingleUser = async (id: number): Promise<User | unknown> => {
  try {
    const connection = await client.connect();
    const sql = "DELETE FROM users WHERE userId=$1";
    const response = await connection.query(sql, [id]);
    connection.release();
    return response.rows[0];
  } catch (error) {
    return error;
  }
};

// Update a user
export const overrideSingleUser = async (
  id: number,
  user: User
): Promise<User | unknown> => {
  try {
    const connection = await client.connect();
    const sql =
      "UPDATE users SET first_name=$2, last_name=$3, username=$4, password=$5 WHERE userId=$1";
    const response = await connection.query(sql, [
      id,
      user.first_name,
      user.last_name,
      user.username,
      user.password,
    ]);
    connection.release();
    return response.rows[0];
  } catch (error) {
    return error;
  }
};

/**
 * ============= AUTHORIZATION =============
 */

// Signup
export const userSignup = async (
  user: User,
  next?: NextFunction | undefined
): Promise<User | unknown> => {
  try {
    const connection = await client.connect();
    const sql =
      "INSERT INTO users(first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *";
    // Type guard (For testing purposes)
    const hashed = bcrypt.hashSync(
      user.password + pepper,
      parseInt(saltRounds as string)
    );
    const response = await connection.query(sql, [
      user.first_name,
      user.last_name,
      user.username,
      process.env.MODE === "test" ? user.password : hashed,
    ]);
    connection.release();
    return response.rows[0];
  } catch (error) {
    return error;
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
