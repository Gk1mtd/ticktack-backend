// create an instance of express server
const app = require("express")();
// makes the environments accessable
require("dotenv").config();
// gets the port from the environment
const { PORT } = process.env;
// require all configurations for express server instance to use
const {connectDB} = require("./config/db.config");
const middlewares = require("./config/middlewares.config");
const session = require("./config/session.config");
const authRouter = require("./modules/auth/router");
const setlistRouter = require("./modules/setlist/router");
const songRouter = require("./modules/song/router");

const cors = require("cors");

// starts the server with all the configurations
async function start() {
  try {
    connectDB();
    middlewares(app);
    session(app);
    authRouter(app);
    setlistRouter(app);
    songRouter(app);
    app.use(cors());
    app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
  } catch (error) {
    console.error(
      `Error while trying to start express server: ${error.message}`
    );
  }
}

start();
