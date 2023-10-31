const router = require('express').Router();

const ctrl = require('../../controllers/feedback');
const schemas = require('../../schemas/feedback');
const { validateBody, authenticate } = require('../../middlewares');

router.get(
  '/',
  ctrl.getAllFeedbacks
  /*
    #swagger.tags = ['Feedbacks']
    #swagger.summary = 'Get all feedbacks'
    #swagger.path = '/api/feedback'
  */
);

router.post(
  '/',
  authenticate,
  validateBody(schemas.feedbackSchemaJoi),
  ctrl.addFeedback
  /*
    #swagger.tags = ['Feedbacks']
    #swagger.summary = 'Add feedback about the application'
    #swagger.path = '/api/feedback'

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Feedback"
          }  
        }
      }
    }
  */
); // роут для авторизованих для відгуку про додаток

router.post(
  '/:quizId',
  validateBody(schemas.feedbackSchemaJoi),
  ctrl.addFeedback
  /*
      #swagger.tags = ['Feedbacks']
      #swagger.summary = 'Add feedback about the quiz'
      #swagger.path = '/api/feedback/:quizId'
      #swagger.method = 'post'

      #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Feedback"
          }  
        }
      }
    }
  */
); // роут для всіх

module.exports = router;
