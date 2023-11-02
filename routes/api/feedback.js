const router = require('express').Router();

const ctrl = require('../../controllers/feedback');
const schemas = require('../../schemas/feedback');
const { validateBody, authenticate } = require('../../middlewares');

/**
 * @swagger
 * components:
 *   schemas:
 *     Feedback:
 *       type: object
 *       required:
 *         - userName
 *         - rate
 *         - finished
 *       properties:
 *         quizId:
 *           type: string
 *           example: '653b7ab5f18b4cc7fb04f0a2'
 *           description: Quiz id
 *         userName:
 *           type: string
 *           example: 'Alex'
 *           description: The name of the user who wrote the feedback
 *         userAvatar:
 *           type: string
 *           example: 'https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'
 *           description: Link to the user's avatar
 *         rate:
 *           type: integer
 *           example: 5
 *           description: The rating given by the user of the quiz
 *         comment:
 *           type: string
 *           example: 'Very nice quiz'
 *           description: Comment about the quiz
 *
 */

/**
 * @swagger
 * tags:
 *   name: Feedbacks
 *   description: The feedbacks managing API
 * /api/feedback:
 *   get:
 *     summary: Lists all the feedbacks
 *     tags: [Feedbacks]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           description: Number of feedbacks
 *     responses:
 *       200:
 *         description: The list of the feedbacks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Feedback'
 *   post:
 *     summary: Create a new feedback about the quiz
 *     tags: [Feedbacks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Feedback'
 *     responses:
 *       201:
 *         description: The created feedback
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedback'
 * /api/feedback/{quizId}:
 *   post:
 *     summary: Create a new feedback about the application
 *     tags: [Feedbacks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Feedback'
 *     responses:
 *       201:
 *         description: The created feedback
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedback'
 */

// Public route
// Get all feedbacks
router.get('/', ctrl.getAllFeedbacks);

// Private route
// Add feedback about the application
router.post(
  '/',
  authenticate,
  validateBody(schemas.feedbackSchemaJoi),
  ctrl.addFeedback
);

// Public route
// Add feedback about the quiz
router.post(
  '/:quizId',
  validateBody(schemas.feedbackSchemaJoi),
  ctrl.addFeedbackQuizId
);

module.exports = router;
