import express from "express";
import { signin, signup } from "../handlers/userController";

const usersRouter = express.Router();

usersRouter.route("/signup").post(signup);
usersRouter.route("/signin").get(signin);

export default usersRouter;
