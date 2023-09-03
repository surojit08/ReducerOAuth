import { Sequelize } from "@sequelize/core";
import chalk from "chalk";

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
  logging: (message) => console.log(chalk.cyan(message, "\n\n")),
});

export default sequelize;
