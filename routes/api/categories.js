/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - categoryName
 *         - categoryType
 *       properties:
 *         categoryName:
 *           type: string
 *           example: 'Cars'
 *           description: Category name
 *         categoryType:
 *           type: string
 *           enum: ['adults', 'children']
 *           example: 'adults'
 *           description: Category audience
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: The categories managing API
 * /api/categories:
 *   get:
 *     summary: Lists all the categories
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: audience
 *         schema:
 *           type: string
 *           enum: ['adults', 'children']
 *           required: true
 *     responses:
 *       200:
 *         description: The list of the categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: The created category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 */

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
