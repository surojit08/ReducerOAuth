// I want to access the database from here in unit call

import { GeneralUser } from "../Models/index.js";

class GeneralUserDao {
  async create({ user }, { transaction }) {
    return GeneralUser.create(user, { transaction: transaction });
  }

  async findByEmail({ email }) {
    return GeneralUser.findOne({
      where: {
        email,
      },
    });
  }

  async findUserById({ user_id }) {
    return GeneralUser.findOne({
      where: {
        userId: user_id,
      },
    });
  }
}

export default Object.freeze(new GeneralUserDao());
