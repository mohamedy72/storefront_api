import express from "express";
import { indexUsers, signin, signup } from "../handlers/userController";

const usersRouter = express.Router();

// usersRouter.route("/").get(indexUsers);
usersRouter.route("/signup").post(signup);
usersRouter.route("/signin").get(signin);

export default usersRouter;
