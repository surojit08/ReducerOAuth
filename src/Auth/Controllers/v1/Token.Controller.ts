import { TokenIntrospectionService } from "../../Services";
import {NextFunction, Request, Response} from "express";

const tokenIntrospect = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { token } = req.body;
    const tokenIntrospectionService = new TokenIntrospectionService(token);
    const introspectionResult = await tokenIntrospectionService.introspect();
    res.status(201).json({ ...introspectionResult });
  } catch (error) {
    return next(error);
  }
};

export { tokenIntrospect };
