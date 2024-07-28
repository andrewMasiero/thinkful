const express = require("express");
const app = express();
const pastesRouter = require("./pastes/pastes.router");
const usersRouter = require("./users/users.router");

console.log("Starting module 3.4.2 Static data");
// TODO: Follow instructions in the checkpoint to implement ths API.

app.use(express.json());

app.use("/users", usersRouter);
app.use("/pastes", pastesRouter);

// Not found handler
app.use((req, res, next) => {
  next(`Not found: ${req.originalUrl}`);
});

// err handler
app.use((err, req, res, next) => {
  console.error(err);
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).json({ error: message });
});

module.exports = app;
