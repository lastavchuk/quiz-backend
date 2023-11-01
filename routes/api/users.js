const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/users');
const schemas = require('../../schemas/users');
const { validateBody, authenticate } = require('../../middlewares');

router.get('/favorites', authenticate, ctrl.getAllFavorites);

router.patch(
  '/favorites',
  authenticate,
  validateBody(schemas.updateFavoritesSchema),
  ctrl.updateFavorite
);

router.patch(
  '/passed-quiz',
  authenticate,
  validateBody(schemas.updateUserPassedQuizzesSchema),
  ctrl.addPassedQuiz
);

// router.get('/test', authenticate, ctrl.getPassedQuizzes);
module.exports = router;
