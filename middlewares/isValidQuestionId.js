const { isValidObjectId } = require('mongoose');
const HttpError = require('../helpers/HttpError');

const isValidQuestionId = (req, res, next) => {
  if (!isValidObjectId(req.params.questionId)) {
    next(HttpError(400, `${req.params.questionId} is not valid id`));
  }
  next();
};

module.exports = isValidQuestionId;
