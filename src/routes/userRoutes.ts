import express from "express";
import {
  editSingleUser,
  indexSingleUser,
  indexUsers,
  removeSingleUser,
  signin,
  signup,
} from "../handlers/userController";

import { verifyToken } from "../services/verifyToken";

const usersRouter = express.Router();

usersRouter.route("/signup").post(signup);
usersRouter.route("/signin").get(signin);

usersRouter.route("/").get(verifyToken, indexUsers);
usersRouter
  .route("/:userId")
  .get(verifyToken, indexSingleUser)
  .post(verifyToken, removeSingleUser)
  .put(verifyToken, editSingleUser);

export default usersRouter;
