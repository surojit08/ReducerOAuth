// here I export an express server
import Express, { json } from "express";
import cookieParser from "cookie-parser";
import v1Router from "./Auth/routes/v1/index.js";
import { errorHandlerMiddleware } from "./Auth/Errors/errorHandlerMiddleware.js";
import cors from "cors";

const expressApp = Express();
expressApp.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  }),
);
expressApp.use(json());
expressApp.use(cookieParser());
expressApp.use("/v1", v1Router);
expressApp.use(errorHandlerMiddleware);

export default expressApp;
