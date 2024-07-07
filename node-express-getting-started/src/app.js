const express = require("express");

const app = express();

const sayHello = (req, res, next) => {
  res.send("Hello!");
};

const logging = (req, res, next) => {
  console.log("A request is being made!");
  next();
};

app.use(sayHello);
app.use(logging);

module.exports = app;
