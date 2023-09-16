import * as bcrypt from "bcrypt";

class HashingStrategy {
  constructor() {
    if (this.constructor === HashingStrategy) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  verify(plain_password, hashed_password) {
    throw new Error("Method 'say()' must be implemented.");
  }

  hash(plain_password) {
    throw new Error("Method 'say()' must be implemented.");
  }
}

class BcryptHashingStrategy extends HashingStrategy {
  async verify(plain_password, hashed_password) {
    return await bcrypt.compare(plain_password, hashed_password);
  }

  async hash(plain_password) {
    const saltRounds = 5;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plain_password, salt);
    if (hash) {
      return hash;
    }
    throw new Error("Can not generate hash");
  }
}

export { BcryptHashingStrategy };
