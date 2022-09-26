import { client } from "../database";
import { NextFunction } from "express";
import { Bcryption } from "../utils/cryptPassword";

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
  const bcryption = new Bcryption();
  try {
    const connection = await client.connect();
    const sql =
      "INSERT INTO users(first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *";
    const hashed = bcryption.bcryptPassword(user.password);
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
  password: string
): Promise<User | null> => {
  const connection = await client.connect();
  const sql = "SELECT password FROM users WHERE username=$1";
  const response = await connection.query(sql, [username]);
  const signedUser = response.rows[0];

  const bcryption = new Bcryption();
  if (!response.rows.length || !bcryption.comparePassword(password)) {
    return null;
  }

  return signedUser;
};

// Index all

// Show a user
