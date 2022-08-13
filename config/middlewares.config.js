// imports express to use JSON and urlencoded funtions
// to parses payloads of requests
const express = require("express");
const { ORIGIN } = process.env;
// allows cross origin resource sharing
const cors = require("cors");
const corsOptions = {
  origin: ORIGIN,
  "Access-Control-Allow-Credentials": true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// provides additional middleware-configuration for the express instance
function middlewares(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(corsOptions));
}

module.exports = middlewares;
