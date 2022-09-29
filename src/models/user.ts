import { client } from "../database";
import { NextFunction } from "express";
import bcrypt from "bcrypt";

const pepper = process.env.BCRYPT_SECRET;
const saltRounds = process.env.SALT_ROUNDS;
export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}

/**
 * ============= CRUD model =============
 */

// Index all
export const getAllUsers = async () => {
  try {
    const connection = await client.connect();
    const sql = "SELECT * FROM users";
    const response = await connection.query(sql);
    connection.release();
    return response.rows;
  } catch (error) {
    throw new Error(`Cannot retrieve the list of users, ${error}`);
  }
};

// Show a user
export const getSingleUser = async (id: number) => {
  try {
    const connection = await client.connect();
    const sql = "SELECT * FROM users WHERE id=$1";
    const response = await connection.query(sql, [id]);
    connection.release();
    return response.rows[0];
  } catch (error) {
    throw new Error(`Cannot retrieve the user with Id: ${id}, ${error}`);
  }
};

// Delete a user
export const deleteSingleUser = async (id: number) => {
  try {
    const connection = await client.connect();
    const sql = "DELETE FROM users WHERE id=$1";
    const response = await connection.query(sql, [id]);
    connection.release();
    return response.rows[0];
  } catch (error) {
    throw new Error(`Cannot delete the user with Id: ${id}, ${error}`);
  }
};

// Update a user
export const overrideSingleUser = async (id: number, user: User) => {
  try {
    const connection = await client.connect();
    const sql =
      "UPDATE users SET first_name=$2, last_name=$3, username=$4, password=$5 WHERE id=$1";
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
    throw new Error(`Cannot update the user with Id: ${id}, ${error}`);
  }
};

/**
 * ============= AUTHORIZATION =============
 */

// Signup
export const userSignup = async (
  user: User,
  next?: NextFunction | undefined
): Promise<User | void> => {
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
    throw new Error(`Can't sign you up, ${error}`);
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
