const ratings = require("../data/ratings-data");

//function checks if rating exists.
function ratingExist(req, res, next){
    const { ratingId } = req.params;
    const foundRating = ratings.find((rating) => rating.id === Number(ratingId));
    if (foundRating){
        res.locals.rating = foundRating;
        next();
    } else {
        next({
          status: 404,
          message: `Rating id could not be found: ${ratingId}` 
        })
    }
}
//function reads rating
function read(req, res, next) {
  res.json({
    data: res.locals.rating,
  });
}
//function lists ratings
function list(req, res) {
  const { noteId } = req.params;
  const byResult = noteId
    ? (rate) => rate.noteId === Number(noteId)
    : () => true;

  res.json({ data: ratings.filter(byResult) });
}

module.exports = {
  list,
  read: [ratingExist, read],
};
