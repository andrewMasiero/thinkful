const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));

const sayHello = (req, res, next) => {
  res.send("Hello!");
};

app.get("/hello", sayHello);

module.exports = app;
