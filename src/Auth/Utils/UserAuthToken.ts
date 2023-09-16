import jsonWebToken from "jsonwebtoken";
import { USER_TYPE_JWT_PRIVATE_KEY } from "../Constants/env";
import {
  InvalidAccessTokenError,
  MalformedDataError,
} from "../Errors/APIErrors/index";
import {CLIENT_TYPE, ClientType} from "../Constants/ClientType";

type TokenDecodedBody = {
  userId : number,
  email : string,
  clientType : ClientType
}
type TokenInputBody = Omit<TokenDecodedBody, "clientType">
/**
 * Manage token generation and verification
 */
class UserAuthToken {
  readonly #token : string;
  readonly #base64token : string;
  #decodeToken : TokenDecodedBody;
  #isTokenVerified: boolean;

  constructor(base64_token: string) {
    this.#base64token = base64_token;
    this.#token =  Buffer.from(base64_token, "base64").toString("ascii");
  }

  //we return an auth token when we sign a token
  static signToken(token_payload:TokenInputBody) {
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

    const base64Token = Buffer.from(token).toString("base64");
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
      ) as TokenDecodedBody;
      this.#isTokenVerified = true;
    } catch (error) {
      throw new InvalidAccessTokenError();
    }
  }

  // getById the decoded token
  getNonVerifiedDecodedToken() {
    const decodePayload = jsonWebToken.decode(this.#token) as TokenDecodedBody;
    if (decodePayload === null) {
      throw new MalformedDataError("Token is malformed");
    }
    return decodePayload;
  }
}

export { UserAuthToken };
export type {TokenInputBody,TokenDecodedBody}
