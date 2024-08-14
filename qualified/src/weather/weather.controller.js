const WeatherStatus = require("./weather.model");

async function list(req, res) {
  const weatherDocuments = await WeatherStatus.find();
  console.log(weatherDocuments);
  res.json(weatherDocuments);
}

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({
      status: 400,
      message: `Must include a ${propertyName}`,
    });
  };
}

async function create(req, res) {
  const { data } = req.body;
  const newWeatherStatus = await WeatherStatus.create(data);
  res.status(201).json({ data: newWeatherStatus });

  res.status(201).json({ data: "" });
}

async function weatherStatusExists(req, res, next) {
  const { weatherStatusId } = req.params;
  const foundWeatherStatus = await WeatherStatus.findOne({
    _id: weatherStatusId,
  });
  if (foundWeatherStatus) {
    res.locals.weatherStatus = foundWeatherStatus;
    return next();
  }
  next({
    status: 404,
    message: `Weather Status id not found: ${weatherStatusId}`,
  });
}

function read(req, res, next) {
  const weatherStatus = res.locals.weatherStatus;
  res.json({ data: weatherStatus });
  res.json({});
}

async function update(req, res) {
  const { data } = req.body;
  const weatherStatus = res.locals.weatherStatus;

  // Update the weather status with the new data
  Object.assign(weatherStatus, data);

  // Save the updated weather status
  const updatedWeatherStatus = await weatherStatus.save();

  res.json({ data: updatedWeatherStatus });

  res.json({ data: "" });
}

async function destroy(req, res) {
  // Delete the weather status with the specific id
  const weatherStatus = res.locals.weatherStatus;
  await weatherStatus.remove();
  res.sendStatus(204); // No Content
  res.sendStatus(0);
}

module.exports = {
  list,
  create: [
    bodyDataHas("date"),
    bodyDataHas("city"),
    bodyDataHas("state"),
    bodyDataHas("country"),
    bodyDataHas("temperature"),
    bodyDataHas("condition"),
    create,
  ],
  read: [weatherStatusExists, read],
  update: [
    weatherStatusExists,
    bodyDataHas("date"),
    bodyDataHas("city"),
    bodyDataHas("state"),
    bodyDataHas("country"),
    bodyDataHas("temperature"),
    bodyDataHas("condition"),
    update,
  ],
  delete: [weatherStatusExists, destroy],
};
