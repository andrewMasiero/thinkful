const morgan = require("morgan");
const express = require("express");
const validateZip = require("./middleware/validateZip");
const getZoos = require("./utils/getZoos");
const app = express();

app.use(morgan("dev"));
app.get("/check/:zip", validateZip, (req, res, next) => {
  // todo
  const zip = req.params.zip;
  const zoo = getZoos(zip);
  if (zoo) {
    res.send(`${zip} exists in our records.`);
  } else {
    res.send(`${zip} does not exist in our records.`);
  }
});

app.get("/zoos/all", (req, res, next) => {
  const admin = req.query.admin;
  if (admin === "true") {
    res.send(`All zoos: ${getZoos().join("; ")}`);
  } else {
    res.send("You do not have access to that route.");
  }
});

app.get("/zoos/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip;
  const zoos = getZoos(zip);
  console.log(zoos);
  if (zoos && zoos.length > 0) {
    res.send(`${zip} zoos: ${zoos.join("; ")}`);
  } else {
    res.send(`${zip} has no zoos.`);
  }
});

app.use((req, res, next) => {
  res.send("That route could not be found!");
});

app.use((err, req, res, next) => {
  res.send(err);
});

module.exports = app;
