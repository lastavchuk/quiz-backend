const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/feedback');
const schemas = require('../../schemas/feedback');
const { validateBody, authenticate } = require('../../middlewares');

router.post('/', authenticate, validateBody(schemas.feedbackSchemaJoi), ctrl.addFeedback); //роут для авторизованих для відгуку про додаток

router.post('/:quizId', validateBody(schemas.feedbackSchemaJoi), ctrl.addFeedback); //роут для всіх

router.get('/', ctrl.getAllFeedbacks);


module.exports = router;