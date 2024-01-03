import { NoImplementationError } from "./SeverErrors/index";
import {
  DataNotFoundError,
  MalformedDataError,
  UserCredentialMismatchError,
  AlreadyRegisterError,
} from "./APIErrors/index";
import {ErrorRequestHandler} from "express";

const errorHandlerMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {

  let httpErrorCode = 500;
  let httpErrorMessage = "something went wrong";
  if (error instanceof NoImplementationError) {
    httpErrorCode = 500;
    httpErrorMessage = error.message;
  } else if (error instanceof DataNotFoundError) {
    httpErrorCode = 404;
    httpErrorMessage = error.message;
  } else if (error instanceof UserCredentialMismatchError) {
    httpErrorCode = 403;
    httpErrorMessage = error.message;
  } else if (error instanceof MalformedDataError) {
    httpErrorCode = 400;
    httpErrorMessage = error.message;
  }else if (error instanceof AlreadyRegisterError) {
    httpErrorCode = 400;
    httpErrorMessage = error.message;
  }
  res.status(httpErrorCode).json({
    success: false,
    message: httpErrorMessage,
    raw_error: error.message,
    type: error.constructor.name,
  });
};
export { errorHandlerMiddleware };
