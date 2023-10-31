const router = require('express').Router();

const ctrl = require('../../controllers/categories');
const schemas = require('../../schemas/categories');
const { validateBody, authenticate } = require('../../middlewares');

router.get(
  '/',
  authenticate,
  ctrl.getCategories
  /*
    #swagger.tags = ['Categories']
    #swagger.summary = 'Get all categories'
    #swagger.path = '/api/categories'
  */
);

router.post(
  '/',
  authenticate,
  validateBody(schemas.categorySchemaJoi),
  ctrl.addCategory
  /*
    #swagger.tags = ['Categories']
    #swagger.summary = 'Add category'
    #swagger.path = '/api/categories'
  */
);

module.exports = router;
