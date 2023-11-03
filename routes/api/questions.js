const router = require('express').Router();

const ctrl = require('../../controllers/questions');
const schemas = require('../../schemas/questions');
const {
  authenticate,
  validateBody,
  isValidQuizId,
  isValidQuestionId,
} = require('../../middlewares');

router.post(
  '/:quizId',
  authenticate,
  isValidQuizId,
  validateBody(schemas.addQuestionSchemaJoi),
  ctrl.addQuestion
);

router.get('/:questionId', authenticate, isValidQuestionId, ctrl.getQuestion);

router.put(
  '/:questionId',
  authenticate,
  isValidQuestionId,
  validateBody(schemas.addQuestionSchemaJoi),
  ctrl.updateQuestion
);

router.delete(
  '/:questionId',
  authenticate,
  isValidQuestionId,
  ctrl.deleteQuestion
);

module.exports = router;
