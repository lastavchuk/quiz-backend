const router = require('express').Router();

const ctrl = require('../../controllers/feedback');
const schemas = require('../../schemas/feedback');
const { validateBody, authenticate } = require('../../middlewares');

//===== PRIVATE routes =====
// Add feedback about application
router.post(
  '/',
  authenticate,
  validateBody(schemas.feedbackSchemaJoi),
  ctrl.addFeedback
);

// ===== PUBLIC routes =====
// Get all feedbacks
router.get('/', ctrl.getAllFeedbacks);

// Add feedback about quiz
router.post(
  '/:quizId',
  validateBody(schemas.feedbackSchemaJoi),
  ctrl.addFeedbackQuizId
);

module.exports = router;
