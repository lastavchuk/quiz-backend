const { isValidObjectId } = require('mongoose');
const HttpError = require('../helpers/HttpError');

const isValidQuizId = (req, res, next) => {
  if (!isValidObjectId(req.params.quizId)) {
    next(HttpError(400, `${req.params.quizId} is not valid id`));
  }
  next();
};

module.exports = isValidQuizId;
