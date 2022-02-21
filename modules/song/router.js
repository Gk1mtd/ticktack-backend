// allow us to use the created controller
const controller = require('./controller');
// instanciate router from express
const router = require('express').Router();

// takes express instance and checks request and links to the right controller
function songRouter(app) {
  // combines routes with controller, via express.router
  router
    .post('/', controller.createSong)
    .put('/', controller.updateSong)
    .delete('/', controller.deleteSong)
    .get("/:songId", controller.getSong)
    .get("/songsAll", controller.getAllSongs)
  // sets baseurl for this auth
  app.use('/api/song', router);
}

module.exports = songRouter;
