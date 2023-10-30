const router = require("express").Router();

const ctrl = require("../../controllers/categories");
const schemas = require("../../schemas/categories");
const { validateBody, authenticate } = require("../../middlewares");

router.get("/", authenticate, ctrl.getCategories);
router.post(
    "/",
    authenticate,
    validateBody(schemas.categorySchemaJoi),
    ctrl.addCategory
);

module.exports = router;
