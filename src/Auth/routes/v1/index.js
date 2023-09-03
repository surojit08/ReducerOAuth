import { Router } from "express";
import userAccountRouter from "./UserAccount.route.js";
import tokenRouter from "./Token.route.js";

const v1Router = Router();
v1Router.use("/accounts", userAccountRouter);
v1Router.use("/tokens", tokenRouter);

export default v1Router;
