import chalk from "chalk";
import "dotenv/config.js";

// import the express app from APIServer.js
import AuthServer from "./AuthServer.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
global.__baseDir = __dirname;


AuthServer.listen(5010, () => {
  console.log(chalk.green("Auth server is running at port 5010"));
});
