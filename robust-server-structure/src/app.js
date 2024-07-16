const express = require("express");
const app = express();
const pastes = require("./data/pastes-data");

console.log("Starting module 3.4.2 Static data");
// TODO: Follow instructions in the checkpoint to implement ths API.

app.use("/pastes/:pasteId", (req, res, next) => {
  const { pasteId } = req.params;
  const foundPaste = pastes.find((paste) => paste.id === Number(pasteId));

  if (foundPaste) {
    res.json({ data: foundPaste });
  } else {
    next(`Pastes not found: ${pasteId}`);
  }
});

app.use("/pastes", (req, res) => {
  res.json({ data: pastes });
});

// Not found handler
app.use((req, res, next) => {
  next(`Not found: ${req.originalUrl}`);
});

// err handler
app.use((err, req, res, next) => {
  console.err(err);
  res.send(err);
});

module.exports = app;
