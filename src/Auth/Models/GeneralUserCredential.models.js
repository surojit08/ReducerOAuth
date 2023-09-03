import { DataTypes, Model } from "@sequelize/core";
import sequelize from "../../Config/AuthDataBase.Config.js";
import { GeneralUser } from "./GeneralUser.models.js";

class GeneralUserCredential extends Model {}

GeneralUserCredential.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      columnName: "id",
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      columnName: "password",
    },
    LastLoginDevice: {
      type: DataTypes.STRING,
      allowNull: true,
      columnName: "last_login_device",
    },
    LastLoginTime: {
      type: DataTypes.DATE,
      allowNull: true,
      columnName: "last_login_time",
    },
    OtpCode: {
      type: DataTypes.STRING,
      allowNull: true,
      columnName: "otp_code",
    },
  },
  {
    sequelize,
  },
);

GeneralUser.hasOne(GeneralUserCredential, {
  foreignKey: {
    name: "userId",
    allowNull: false,
    columnName: "user_id",
  },
});

export { GeneralUserCredential };
