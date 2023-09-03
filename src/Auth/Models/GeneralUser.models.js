import { DataTypes, Model } from "@sequelize/core";
import sequelize from "../../Config/AuthDataBase.Config.js";

class GeneralUser extends Model {}

GeneralUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      columnName: "id",
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      columnName: "first_name",
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      columnName: "last_name",
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: true,
      columnName: "middle_name",
      defaultValue: "",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      columnName: "email",
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "A",
      columnName: "status",
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  {
    sequelize,
  },
);

export { GeneralUser };
