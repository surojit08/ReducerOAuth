import * as bcrypt from "bcrypt";

interface HashingStrategy {
  verify:(plain_password:string, hashed_password:string)=>Promise<boolean>
  hash:(plain_password:string)=>Promise<string>
}

class BcryptHashingStrategy implements HashingStrategy {
  async verify(plain_password:string, hashed_password:string) {
    return await bcrypt.compare(plain_password, hashed_password);
  }

  async hash(plain_password:string) {
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
