import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User, userSignin, userSignup } from "../models/user";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: User = {
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
    };

    const newUser = await userSignup(user, next);
    res.json({
      data: newUser,
    });
  } catch (error) {
    res.json({
      data: error,
    });
  }
};

interface SignedUser {
  username: string;
  password: string;
}

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: SignedUser = {
      username: req.body.username,
      password: req.body.password,
    };
    const signedUser = await userSignin(user.username, user.password);
    res.json({
      data: signedUser,
    });
  } catch (error) {
    res.json({
      data: error,
    });
  }
};
