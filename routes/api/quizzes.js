const router = require('express').Router();

const ctrl = require('../../controllers/quizzes');
const schemas = require('../../schemas/quizzes');
const {
  validateBody,
  authenticate,
  isValidQuizId,
  upload,
} = require('../../middlewares');

// ===== PUBLIC routes =====
// Get random or sorted quizzes
router.get('/random', ctrl.getRandomQuizzes);

// The total number of people who passed all quizzes
router.get('/total', ctrl.getTotalAllQuizzes);

// ===== PRIVATE routes =====
// get all and filter quizzes
router.get('/', authenticate, ctrl.getSearchQuiz);

// Add new quiz
router.post(
  '/',
  authenticate,
  upload.single('image'),
  validateBody(schemas.addQuizSchemaJoi),
  ctrl.addQuiz
);

// Get all quizzes created by the user
router.get('/myquiz', authenticate, ctrl.getAllQuizCreateUser);

// Get last tests that the user has passed
router.get('/passedquiz', authenticate, ctrl.getPassedQuizzes);

// Update quiz from quizId
router.put(
  '/:quizId',
  authenticate,
  isValidQuizId,
  upload.single('image'),
  validateBody(schemas.addQuizSchemaJoi),
  ctrl.updateQuiz
);

// Increase the counter of passed quizzes by 1
router.patch('/:quizId', isValidQuizId, ctrl.patchOnePassed);

// Delete quiz from quizId
router.delete('/:quizId', authenticate, isValidQuizId, ctrl.deleteQuiz);

// ===== PUBLIC route =====
// Get quiz with quizId
router.get('/:quizId', isValidQuizId, ctrl.getOneQuiz);

module.exports = router;
