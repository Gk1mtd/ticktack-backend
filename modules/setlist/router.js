// allow us to use the created controller
const controller = require('./controller');
// instanciate router from express
const router = require('express').Router();

// takes express instance and checks request and links to the right controller
function setlistRouter(app) {
  // combines routes with controller, via express.router
  router
    .post('/create-setlist', controller.createSetlist)
    .put('/update-setlist', controller.updateSetlist)
    .get("/getall-setlists", controller.getAllSetlists)
    .get('/get-setlist/:setlistId', controller.getSetlist)
    .delete("/delete-setlist", controller.deleteSetlist)
  // sets baseurl for this auth
  app.use('/api/setlist', router);
}

module.exports = setlistRouter;
