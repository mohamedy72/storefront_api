import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getAllUsers, User, userSignin, userSignup } from "../models/user";

// export const indexUsers = async (req: Request, res: Response) => {
//   try {
//     const results = await getAllUsers();
//     res.status(200).json({
//       data: results,
//     });
//   } catch (error) {
//     res.status(400).json({
//       data: error,
//     });
//   }
// };

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
  const user: SignedUser = {
    username: req.body.username,
    password: req.body.password,
  };
  const signedUser = await userSignin(user.username, user.password, next);
  if (!signedUser) {
    res.status(400).json({ data: "Invalid username or password" });
  } else {
    res.status(200).json({
      data: signedUser,
    });
  }
};
