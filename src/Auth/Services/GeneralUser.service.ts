// here I handle business logic
import sequelize from "../../Config/AuthDataBase.Config";
import { GeneralUserCredentialDao, GeneralUserDao } from "../DAO/index";
import { GeneralUserDTO } from "../DTO/index";
import { HashPassword, Password } from "../Utils/Password";
import {
  DataNotFoundError,
  UserCredentialMismatchError,
} from "../Errors/APIErrors/index";
import { UserAuthToken } from "../Utils/UserAuthToken";
import {GeneralUser} from "../Models";


class GeneralUserService {
  #user: GeneralUser;
  #email:string;

  static async registerUser({ user_details }) {
    const new_user = GeneralUserDTO.toUserCreate(user_details);
    try {
      const createdUser = await sequelize.transaction(async (t1) => {
        // save a new user to db
        const userBasics = await GeneralUserDao.create(
          { user: new_user },
          { transaction: t1 },
        );
        // saving sensitive data such as password after hashing
        const password = (
          await new Password(user_details.password).createHashPassword()
        ).getHashedPassword();
        const userCredential = {
          userId: userBasics.id,
          password,
        };
        // save the password on a different table
        await GeneralUserCredentialDao.create(
          { user_credential: userCredential },
          { transaction: t1 },
        );
        return userBasics;
      });
      return GeneralUserDTO.toUser(createdUser);
    } catch (error) {
      throw error;
    }
  }

  static async init(email:string) {
    const generalUserService = new GeneralUserService();
    generalUserService.#email = email;
    await generalUserService.#findByEmail();
    return generalUserService;
  }

  static async findByUserId(user_id:number) {
    const user = await GeneralUserDao.findUserById({ user_id });
    if (user) {
      return user;
    }
    throw new DataNotFoundError();
  }

  async #findByEmail() {
    const user = await GeneralUserDao.findByEmail({ email: this.#email });
    if (user) {
      this.#user = user;
      return;
    }
    //@ts-ignore

    throw new DataNotFoundError();
  }

  async loginWithPassword(plain_password:string) {
    const userCredential = await GeneralUserCredentialDao.findOne({
      user_id: this.#user.id,
    });
    //@ts-ignore
    const hashedPassword = new HashPassword(userCredential.password);
    const isMatch = await hashedPassword.verifyPassword(plain_password);
    if (isMatch) {
      // return a token
      return {
        token: UserAuthToken.signToken(
          GeneralUserDTO.toTokenPayload(this.#user),
        ).getToken(),
      };
    } else {
      throw new UserCredentialMismatchError();
    }
  }
}

export default Object.freeze(GeneralUserService);
