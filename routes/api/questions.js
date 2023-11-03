const router = require('express').Router();

const ctrl = require('../../controllers/questions');
const schemas = require('../../schemas/questions');
const {
  authenticate,
  validateBody,
  isValidQuizId,
  isValidQuestionId,
} = require('../../middlewares');

// Add new question to quiz with quizId
router.post(
  '/:quizId',
  authenticate,
  isValidQuizId,
  validateBody(schemas.addQuestionSchemaJoi),
  ctrl.addQuestion
);

// Get question from questionId
router.get('/:questionId', authenticate, isValidQuestionId, ctrl.getQuestion);

// Update question from questionId
router.put(
  '/:questionId',
  authenticate,
  isValidQuestionId,
  validateBody(schemas.addQuestionSchemaJoi),
  ctrl.updateQuestion
);

// Delete question from questionId
router.delete(
  '/:questionId',
  authenticate,
  isValidQuestionId,
  ctrl.deleteQuestion
);

module.exports = router;
