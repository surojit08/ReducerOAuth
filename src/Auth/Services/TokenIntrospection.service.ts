import {CLIENT_TYPE, ClientType} from "../Constants/ClientType";
import { NoImplementationError } from "../Errors/SeverErrors/index";
import {TokenDecodedBody, UserAuthToken} from "../Utils/UserAuthToken";
import { GeneralUserService } from "./index";

class TokenIntrospectionService {
  readonly #clientType : ClientType;
  #decodedToken: TokenDecodedBody;
  private token: UserAuthToken;

  /**
   * Start a token introspecting service
   * @param {String} token_string
   */
  constructor(token_string:string) {
    // here we pass a class of token then we call decoding on that to getById the token
    const token = new UserAuthToken(token_string);
    const decodedToken = token.getNonVerifiedDecodedToken();
    this.token = token;
    this.#clientType = decodedToken.clientType;
    this.#decodedToken = decodedToken;
  }

  // verify the token return status as 'active'
  async introspect() {
    try {
      let clientDetails:any;
      let clientName: string;
      let clientEmail: string;
      if (this.#clientType === CLIENT_TYPE.USER) {
        this.#userTokenIntrospection();
        clientDetails = await GeneralUserService.findByUserId(
          this.#decodedToken.userId,
        );
        clientName = [
          clientDetails.firstName ?? "",
          clientDetails.middleName ?? "",
          clientDetails.lastName ?? "",
        ].join(" ");
        clientEmail = clientDetails.email;
      }
      if (this.#clientType === CLIENT_TYPE.APP) {
        this.#clientAppTokenIntrospection();
      }
      return {
        active: true,
        clientId: this.#decodedToken.userId,
        clientType: this.#clientType,
        clientName,
        clientEmail,
      };
    } catch (error) {
      return {
        active: false,
        clientId: this.#decodedToken.userId,
        clientType: this.#clientType,
      };
    }
  }

  // todo: in future we may need to perform db call.
  #userTokenIntrospection() {
    //@ts-ignore
    this.token.verifyToken();
  }

  #clientAppTokenIntrospection() {
    throw new NoImplementationError();
  }
}

export { TokenIntrospectionService };
