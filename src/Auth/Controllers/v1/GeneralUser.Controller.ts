import { GeneralUserService } from "../../Services/index";
import {Response, Request, NextFunction} from "express";

const registerUser = async (req:Request, res:Response,next:NextFunction) => {
  try{
    const body = req.body;
    const created_user = await GeneralUserService.registerUser({
      user_details: body,
    });
    res.status(201).json({ user: created_user });
  }
  catch(error){
    next(error)
  }
};
const loginByPassword = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const body = req.body;
    const { email, password } = body;
    const userService = await GeneralUserService.init(email);
    const loginResult = await userService.loginWithPassword(password);
    res.cookie("_ePaperCrd", loginResult.token, {
      httpOnly: true,
      secure: true,
    });
    res.status(201).json({
      success: true,
      data:{
        message: "login successful",
        token: loginResult.token,
      }

    });
  } catch (error) {
    return next(error);
  }
};

export { registerUser, loginByPassword };
