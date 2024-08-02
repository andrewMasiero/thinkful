const urls = require("../data/urls-data");

let lastUrlId = urls.reduce((maxId, url) => Math.max(maxId, url.id), 0);

function list(req, res) {
  res.json({ data: urls });
}

function read(req, res, next) {
  res.json({ data: res.locals.url });
}

function create(req, res) {}

function update(req, res, next) {}

function urlExists(req, res, next) {
  const urlId = parseInt(req.params.urlId);
  res.locals.url = urls.find((url) => url.id === urlId);
  if (res.locals.url) {
    next();
  } else {
    next({ status: 404, message: "URL not found" });
  }
}

module.exports = { list, read: [urlExists, read], urlExists };
