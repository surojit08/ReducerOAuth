import { Router } from "express";
import userAccountRouter from "./UserAccount.route";
import tokenRouter from "./Token.route";

const v1Router = Router();
v1Router.use("/accounts", userAccountRouter);
v1Router.use("/tokens", tokenRouter);

export default v1Router;
