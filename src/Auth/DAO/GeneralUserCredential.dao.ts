// I want to access the database from here in unit call

import { GeneralUserCredential } from "../Models";

class GeneralUserCredentialDao {
  async create({ user_credential }, { transaction }) {
    return GeneralUserCredential.create(user_credential, {
      transaction: transaction,
    });
  }

  async findOne({ user_id }) {
    return GeneralUserCredential.findOne({
      where: {
        userId: user_id,
      },
    });
  }
}

export default Object.freeze(new GeneralUserCredentialDao());
