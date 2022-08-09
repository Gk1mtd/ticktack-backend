// imports express to use JSON and urlencoded funtions
// to parses payloads of requests
const express = require("express");
// allows cross origin resource sharing
const cors = require("cors");
const { ORIGIN } = process.env;

// provides additional middleware-configuration for the express instance
function middlewares(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
}

module.exports = middlewares;
