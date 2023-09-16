import { BcryptHashingStrategy } from "./HashingStrategy";

const hashingStrategy = new BcryptHashingStrategy();

class Password {
  plainPassword : string;

  constructor(plain_password:string) {
    this.plainPassword = plain_password;
  }

  async createHashPassword() {
    // create a hashed password from plain password
    const hash = await hashingStrategy.hash(this.plainPassword);
    return new HashPassword(hash);
  }
}

class HashPassword {
  readonly #hashedPassword:string;

  constructor(hashed_password:string) {
    this.#hashedPassword = hashed_password;
  }

  async verifyPassword(plain_password:string) {
    return hashingStrategy.verify(plain_password, this.#hashedPassword);
  }

  getHashedPassword() {
    return this.#hashedPassword;
  }
}

export { Password, HashPassword };
