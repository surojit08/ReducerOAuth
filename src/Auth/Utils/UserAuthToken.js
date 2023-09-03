import jsonWebToken from "jsonwebtoken";
import { USER_TYPE_JWT_PRIVATE_KEY } from "../Constants/env.js";
import {
  InvalidAccessTokenError,
  MalformedDataError,
} from "../Errors/APIErrors/index.js";
import { CLIENT_TYPE } from "../Constants/ClientType.js";

/**
 * Manage token generation and verification
 */
class UserAuthToken {
  #token;
  #base64token;
  #decodeToken;
  #isTokenVerified;

  constructor(base64_token) {
    this.#base64token = base64_token;
    this.#token = new Buffer(base64_token, "base64").toString("ascii");
  }

  //we return an auth token when we sign a token
  static signToken(token_payload) {
    const userDetails = {
      userId: token_payload.userId,
      email: token_payload.email,
      clientType: CLIENT_TYPE.USER,
    };
    const tokenOptions = {
      audience: "reducer.EPaper.com",
      issuer: "reducer.auth.com",
    };
    const token = jsonWebToken.sign(
      userDetails,
      USER_TYPE_JWT_PRIVATE_KEY,
      tokenOptions,
    );

    const base64Token = new Buffer(token).toString("base64");
    return new UserAuthToken(base64Token);
  }

  getToken() {
    return this.#base64token;
  }

  // verify the given user auth token
  verifyToken() {
    // first, we try to decode the token
    this.getNonVerifiedDecodedToken();
    try {
      this.#decodeToken = jsonWebToken.verify(
        this.#token,
        USER_TYPE_JWT_PRIVATE_KEY,
      );
      this.#isTokenVerified = true;
    } catch (error) {
      throw new InvalidAccessTokenError();
    }
  }

  // getById the decoded token
  getNonVerifiedDecodedToken() {
    const decodePayload = jsonWebToken.decode(this.#token);
    if (decodePayload === null) {
      throw new MalformedDataError("Token is malformed");
    }
    return decodePayload;
  }
}

export { UserAuthToken };
