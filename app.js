// create an instance of express server
const app = require("express")();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// makes the environments accessable
require("dotenv").config();

// gets the port from the environment
const { PORT } = process.env;

// require all configurations for express server instance to use
const { connectDB } = require("./config/db.config");
const session = require("./config/session.config");
const authRouter = require("./modules/auth/router");
const setlistRouter = require("./modules/setlist/router");
const songRouter = require("./modules/song/router");

// cors
const cors = require("cors");
app.use(cors());

// starts the server with all the configurations
async function start() {
  try {
    connectDB();

    session(app);
    authRouter(app);
    setlistRouter(app);
    songRouter(app);
    app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
  } catch (error) {
    console.error(
      `Error while trying to start express server: ${error.message}`
    );
  }
}

start();
