// allow us to use the created controller
const controller = require("./controller");
// instanciate router from express
const router = require("express").Router();

// takes express instance and checks request and links to the right controller
function authRouter(app) {
  // combines routes with controller, via express.router
  router.post("/signup", controller.signUp).post("/login", controller.login);
  // sets baseurl for this auth
  app.use("/api", router);
}

module.exports = authRouter;
