// allow us to use the created controller
const controller = require('./controller');
// instanciate router from express
const router = require('express').Router();

// takes express instance and checks request and links to the right controller
function songRouter(app) {
  // combines routes with controller, via express.router
  router
    .post('/song', controller.createSong)
    .put('/song', controller.updateSong)
    .delete('/song', controller.deleteSong)
    .get("/song", controller.getSong)
    .get("/songsAll", controller.getAllSongs)
  // sets baseurl for this auth
  app.use('/api/setlist', router);
}

module.exports = songRouter;
