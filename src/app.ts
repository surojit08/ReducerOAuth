import "dotenv/config.js";

// import the express app from APIServer.js
import AuthServer from "./AuthServer";



AuthServer.listen(5010, () => {
  console.log("Auth server is running at port 5010");
});
