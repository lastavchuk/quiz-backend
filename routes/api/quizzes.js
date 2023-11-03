const router = require('express').Router();

const ctrl = require('../../controllers/quizzes');
const schemas = require('../../schemas/quizzes');
const {
  validateBody,
  authenticate,
  isValidQuizId,
  upload,
} = require('../../middlewares');

router.post(
  '/',
  authenticate,
  validateBody(schemas.addQuizSchemaJoi),
  ctrl.addQuiz
);

router.put(
  '/:quizId',
  authenticate,
  isValidQuizId,
  validateBody(schemas.updateQuizSchemaJoi),
  ctrl.updateQuiz
);

// get all and filter quizzes
router.get('/', authenticate, ctrl.getSearchQuiz);

// get random quiz
router.get('/random', ctrl.getRandomQuizzes);
router.get('/total', ctrl.getTotalAllQuizzes);
router.get('/myquiz', authenticate, ctrl.getAllQuizCreateUser);
router.get('/passedquiz', authenticate, ctrl.getPassedQuizzes);
router.patch('/:quizId', authenticate, isValidQuizId, ctrl.patchOnePassed); // ???????
router.get('/:quizId', isValidQuizId, ctrl.getOneQuiz);
router.delete('/:quizId', authenticate, isValidQuizId, ctrl.deleteQuiz);

module.exports = router;
