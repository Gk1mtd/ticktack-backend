// allow us to use the created controller
const controller = require('./controller');
// instanciate router from express
const router = require('express').Router();

// takes express instance and checks request and links to the right controller
function songRouter(app) {
  // combines routes with controller, via express.router
  router
    .post('/song/', controller.createSong)
    .put('/song/', controller.updateSong)
    .delete('/setlist/:setlistId/song/:songId', controller.deleteSong)
    .get("/song/:songId", controller.getSong)
    .get("/setlist/:setlistId", controller.getAllSongs)
  // sets baseurl for this auth
  app.use('/api', router);
}

module.exports = songRouter;
