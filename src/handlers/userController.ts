import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  deleteSingleUser,
  getAllUsers,
  getSingleUser,
  overrideSingleUser,
  User,
  userSignin,
  userSignup,
} from "../models/user";
import { activeOrderByUser } from "../services/OrderByUser";

/**
 * ============= CRUD on @users =============
 */

export const indexUsers = async (_req: Request, res: Response) => {
  try {
    const results = await getAllUsers();
    res.status(200).json({
      data: results,
    });
  } catch (error) {
    res.status(400).json({
      data: error,
    });
  }
};

export const indexSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = +req.params.userId;
    const result = await getSingleUser(userId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      data: error,
    });
  }
};

export const removeSingleUser = async (req: Request, res: Response) => {
  const userId = +req.params.userId;
  const result = await deleteSingleUser(userId);
  if (!result) {
    res.status(400).json(`Couldn't find a user with this id ${userId}`);
  } else {
    res.status(200).json(`User ${userId} has been deleted from the DB`);
  }
};

export const editSingleUser = async (req: Request, res: Response) => {
  const userId = +req.params.userId;
  const user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password: req.body.password,
  };
  const result = await overrideSingleUser(userId, user);
  if (!result) {
    res.status(400).json(`Couldn't find a user with this id ${userId}`);
  } else {
    res.status(200).json(`User ${userId} has been deleted from the DB`);
  }
};

export const indexOrderByUser = async (req: Request, res: Response) => {
  try {
    const id = +req.params.userId;
    const result = await activeOrderByUser(id);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      data: error,
    });
  }
};

/**
 * ============= AUTHORIZATION =============
 */

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
    };
    const newUser = await userSignup(user, next);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as string
    );

    res.status(201).json({
      token,
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
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
    const signedUser = await userSignin(user.username, user.password, next);
    if (!signedUser) {
      return next("You must signup first");
    }
    const token = jwt.sign(
      { user: signedUser },
      process.env.TOKEN_SECRET as string
    );
    res.status(200).json({
      token,
    });
  } catch (error) {
    res.status(400).json({ data: `Invalid username or password ${error}` });
  }
};
