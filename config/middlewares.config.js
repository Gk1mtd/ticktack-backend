// imports express to use JSON and urlencoded funtions
// to parses payloads of requests
const express = require("express");
const { ORIGIN } = process.env;
// allows cross origin resource sharing

// provides additional middleware-configuration for the express instance
function middlewares(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
}

module.exports = middlewares;
