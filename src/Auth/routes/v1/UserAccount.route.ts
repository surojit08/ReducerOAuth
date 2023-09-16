import { Router } from "express";
import {
  loginByPassword,
  registerUser,
} from "../../Controllers/v1/GeneralUser.Controller";

const userAccountRouter = Router();

userAccountRouter.post("/login", loginByPassword);
userAccountRouter.post("/", registerUser);

export default userAccountRouter;
