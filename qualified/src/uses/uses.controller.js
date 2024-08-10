const uses = require("../data/uses-data");
let lastUseId = uses.reduce((maxId, use) => Math.max(maxId, use.id), 0);

function list(req, res) {
  res.json({ data: uses });
}

function read(req, res) {
  res.json({ data: res.locals.use });
}

function destroy(req, res) {
  const { useId } = req.params;
  console.log(uses);
  const index = uses.findIndex((use) => use.id === Number(useId));
  uses.splice(index, 1);
  console.log(uses);
  res.sendStatus(204);
}

function useExists(req, res, next) {
  const useId = parseInt(req.params.useId);
  res.locals.use = uses.find((use) => use.id === useId);
  if (res.locals.use) {
    next();
  } else {
    next({ status: 404, message: `Use not found for: ${useId}` });
  }
}

function recordUrlUse(req, res, next) {
  create(res.locals.url.id);
  next();
}

function create(urlId) {
  uses.push({ id: ++lastUseId, urlId: urlId, time: Date.now() });
}

module.exports = {
  list,
  read: [useExists, read],
  destroy: [useExists, destroy],
  recordUrlUse,
};
