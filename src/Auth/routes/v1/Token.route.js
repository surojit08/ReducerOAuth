import { Router } from "express";
import { tokenIntrospect } from "../../Controllers/v1/Token.Controller.js";

const tokenRouter = Router();

tokenRouter.post("/introspect", tokenIntrospect);

export default tokenRouter;
