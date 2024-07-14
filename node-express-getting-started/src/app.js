const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.get("/state/:abbreva", (req, res, next) => {
  const abbreviation = req.params.abbreviation;

  if (abbreviation.length !== 2) {
    next("State abbreviation is invalid.");
  } else {
    res.send(`${abbreviation} is a nice state. I'd like to visit.`);
  }
});

module.exports = app;
