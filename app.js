// makes the environments accessable
require("dotenv").config();

// create an instance of express server
const express = require("express");
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// middlewares - cors
const cors = require("cors");
// const origin = process.env.ORIGIN;
const origin = ["*", process.env.ORIGIN];
app.use(
  cors({
    origin: origin,
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
  })
);

// require all configurations for express server instance to use
const { connectDB } = require("./config/db.config");
const session = require("./config/session.config");
const authRouter = require("./modules/auth/router");
const setlistRouter = require("./modules/setlist/router");
const songRouter = require("./modules/song/router");

// gets the port from the environment
const { PORT } = process.env;

// starts the server with all the configurations
async function start() {
  try {
    await connectDB();
    session(app);
    authRouter(app);
    setlistRouter(app);
    songRouter(app);
    await app.listen(PORT, () =>
      console.log(`Server is running on Port: ${PORT}`)
    );
  } catch (error) {
    console.error(
      `Error while trying to start express server: ${error.message}`
    );
  }
}

start();
