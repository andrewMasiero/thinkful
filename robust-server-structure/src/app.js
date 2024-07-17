const express = require("express");
const app = express();
const pastes = require("./data/pastes-data");

console.log("Starting module 3.4.2 Static data");
// TODO: Follow instructions in the checkpoint to implement ths API.

app.use(express.json());
app.get("/pastes/:pasteId", (req, res, next) => {
  const { pasteId } = req.params;
  const foundPaste = pastes.find((paste) => paste.id === Number(pasteId));

  if (foundPaste) {
    res.json({ data: foundPaste });
  } else {
    next({
      status: 404,
      message: `Pastes not found: ${pasteId}`,
    });
  }
});

app.get("/pastes", (req, res) => {
  res.json({ data: pastes });
});

function bodyHasTextProperty(req, res, next) {
  const { data: { text } = {} } = req.body;
  if (text) {
    next();
  } else {
    next({
      status: 400,
      message: "A 'text' property is required.",
    });
  }
}

let lastPasteId = pastes.reduce((maxId, paste) => Math.max(maxId, paste.id), 0);

app.post("/pastes", bodyHasTextProperty, (req, res, next) => {
  const { data: { name, syntax, exposure, expiration, text, user_id } = {} } =
    req.body;
  const newPaste = {
    id: ++lastPasteId, // Increment last ID, then assign as the current ID
    name,
    syntax,
    exposure,
    expiration,
    text,
    user_id,
  };
  pastes.push(newPaste);
  res.status(201).json({ data: newPaste });
});

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
