const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const usersRouter = require("./users/users.router");

// The DATABASE_URL comes from the .env file, which is loaded by dotenv
// It should be defined in the .env file as DATABASE_URL=your_mongodb_connection_string
mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => console.error(error));

const app = express();
app.use(express.json());

// Write your code here

app.use("/users", usersRouter);

// Not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
