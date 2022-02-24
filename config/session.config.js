const session = require("express-session");
const { SESSION_SECRET, NODE_ENV, MONGO_DB_URL } = process.env;
const mongoStore = require("connect-mongo");

function sessionConfiguration(app) {
  app.set("trust proxy", 1);
  app.use(
    session(
      {
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: mongoStore.create({ mongoUrl: MONGO_DB_URL }),
      },
      {
        cookie: {
          maxAge: 1000 * 24 * 60 * 60,
          secure: NODE_ENV === "production",
          sameSite: "none"
        },
      }
    )
  );
}

module.exports = sessionConfiguration