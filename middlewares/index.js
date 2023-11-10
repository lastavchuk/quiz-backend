const authenticate = require('./authenticate');
const isValidQuizId = require('./isValidQuizId');
const isValidQuestionId = require('./isValidQuestionId');
const validateBody = require('./validateBody');
const upload = require('./upload');

module.exports = {
  authenticate,
  isValidQuizId,
  isValidQuestionId,
  validateBody,
  upload,
};
