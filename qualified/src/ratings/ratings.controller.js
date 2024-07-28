const ratings = require("../data/ratings-data");

function list(req, res) {
  console.log(req.params);
  const { noteId } = req.params;
  res.json({
    data: ratings.filter(
      noteId ? (rating) => rating.noteId == Number(noteId) : () => true
    ),
  });
}

function read(req, res) {
  res.json({ data: res.locals.rating });
}

function ratingExists(req, res, next) {
  const ratingId = Number(req.params.ratingId);
  console.log(`rating: ${ratingId}`);
  res.locals.rating = ratings.find((r) => r.id === ratingId);
  if (res.locals.rating) {
    next();
  }
  next({ status: 404, message: `Rating id: ${ratingId} not found` });
}

module.exports = { list, read: [ratingExists, read], ratingExists };
