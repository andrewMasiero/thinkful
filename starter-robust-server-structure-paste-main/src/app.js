const express = require("express");
const app = express();

console.log("Starting module 3.4.2 Static data");
// TODO: Follow instructions in the checkpoint to implement ths API.

// Not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((error, request, response, next) => {
  console.error(error);
  response.send(error);
});

module.exports = app;
