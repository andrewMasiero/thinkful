const urls = require("../data/urls-data");
const recordUrlUse = require("../uses/uses.controller").recordUrlUse;

let lastUrlId = urls.reduce((maxId, url) => Math.max(maxId, url.id), 0);

function list(req, res) {
  res.json({ data: urls });
}

function read(req, res, next) {
  res.json({ data: res.locals.url });
}

function create(req, res) {
  const { data: { href } = {} } = req.body;
  const newUrl = {
    href,
    id: ++lastUrlId,
  };
  urls.push(newUrl);
  res.status(201).json({ data: newUrl });
}

function update(req, res, next) {
  const url = res.locals.url;
  const { data: { href } = {} } = req.body;

  url.href = href;

  res.json({ data: url });
}

function urlExists(req, res, next) {
  const urlId = parseInt(req.params.urlId);
  res.locals.url = urls.find((url) => url.id === urlId);
  if (res.locals.url) {
    next();
  } else {
    next({ status: 404, message: `URL not found for url id: ${urlId}` });
    //  an error key set to a message containing the id
  }
}

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({ status: 400, message: `Must include a ${propertyName}` });
  };
}

module.exports = {
  list,
  read: [urlExists, recordUrlUse, read],
  create: [bodyDataHas("href"), create],
  update: [urlExists, bodyDataHas("href"), update],
  urlExists,
};
