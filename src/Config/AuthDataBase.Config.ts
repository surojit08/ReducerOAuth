import { Sequelize } from "@sequelize/core";
import {GeneralUser, GeneralUserCredential} from "../Auth/Models";

const dbName = process.env[`AUTH_DB_NAME`];
const userName = process.env[`AUTH_DB_USER`];
const userPassword = process.env[`AUTH_DB_USER_PASSWORD`];
const hostName = process.env[`AUTH_DB_HOST`];
const ssl = process.env[`SSL`] === "true";

const sequelize = new Sequelize(dbName, userName, userPassword, {
  host: hostName,
  dialect: "postgres",
  dialectOptions: {
    ssl,
  },
  logging: (message) => console.log(message, "\n\n"),
  models:[
    GeneralUser,
    GeneralUserCredential
  ]
});

sequelize.sync({
  alter:true
})
export default sequelize;
