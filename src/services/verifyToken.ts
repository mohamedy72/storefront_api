// @ts-nocheck

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { client } from "../database";
import { promisify } from "util";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next("PLease supply the token in the header");
    }
    const jwtToken = authHeader.split(" ")[1];
    if (!jwtToken) {
      return next("You aren't logged in");
    }
    const { user } = await promisify(jwt.verify)(
      jwtToken,
      process.env.TOKEN_SECRET
    );
    const connection = await client.connect();
    const sql = "SELECT * from users WHERE username=$1";
    const result = await connection.query(sql, [user.username]);
    if (!result) return next("User not found");
    next();
  } catch (error) {
    res.status(401).json("Unauthorized Access");
  }
};
