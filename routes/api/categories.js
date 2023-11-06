const router = require('express').Router();

const ctrl = require('../../controllers/categories');
const schemas = require('../../schemas/categories');
const { validateBody, authenticate } = require('../../middlewares');

// Get all categories
router.get('/', authenticate, ctrl.getCategories);

// Add category
router.post(
  '/',
  authenticate,
  validateBody(schemas.categorySchemaJoi),
  ctrl.addCategory
);

module.exports = router;
