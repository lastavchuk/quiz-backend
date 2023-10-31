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

router.delete('/:quizId', authenticate, isValidQuizId, ctrl.deleteQuiz);

// get random quiz
router.get('/random', ctrl.getRandomQuizzes);
router.get('/myquiz', authenticate, ctrl.getAllQuizCreateUser);
router.patch('/:quizId', authenticate, isValidQuizId, ctrl.getOnePassed); // ???????
router.get('/:quizId', authenticate, isValidQuizId, ctrl.getOneQuiz);

// get all and filter quizzes
router.get('/', authenticate, ctrl.getSearchQuiz);

module.exports = router;
