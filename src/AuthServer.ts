// here I export an express server
import Express, { json } from "express";
import cookieParser from "cookie-parser";
import v1Router from "./Auth/routes/v1/index";
import { errorHandlerMiddleware } from "./Auth/Errors/errorHandlerMiddleware";
import cors from "cors";

const expressApp = Express();
expressApp.use(
  cors({
    origin: true,
    credentials: true,
    exposedHeaders: ["set-cookie"],
  }),
);
expressApp.use(json());
expressApp.use(cookieParser());
expressApp.get("/", (req,res)=>{
    res.status(200).send("Auth server is running");
});
expressApp.use("/v1", v1Router);
expressApp.use(errorHandlerMiddleware);

export default expressApp;
