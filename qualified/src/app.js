const express = require("express");
const app = express();

const users = require("./data/users-data");
const states = require("./data/states-data");

app.use("/users/:userId", (req, res, next) => {
  const { userId } = req.params;
  const userFound = users.find((user) => user.id === Number(userId));

  if (userFound) {
    res.json({ data: userFound });
  } else {
    next(`User ID not found: ${userId}`);
  }
});

app.use("/users", (req, res) => {
  res.json({ data: users });
});

app.use("/states/:sateCode", (req, res, next) => {
  const stateCode = req.params.sateCode;
  console.log(stateCode);
  if (stateCode in states) {
    res.json({ data: { stateCode: stateCode, name: states[stateCode] } });
  } else {
    next(`State code not found: ${stateCode}`);
  }
});

app.use("/states", (req, res) => {
  res.json({ data: states });
});

app.use((req, res, next) => {
  res.send(`Not found: ${req.originalUrl}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.send(err);
});

module.exports = app;
