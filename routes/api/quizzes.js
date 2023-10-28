const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/quizzes");
const schemas = require("../../schemas/quizzes");
const {
    validateBody,
    authenticate,
    isValidQuizId,
    upload,
} = require("../../middlewares");

router.post(
    "/",
    authenticate,
    // validateBody(schemas.quizSchemaJoi),
    ctrl.addQuiz
);

router.put(
    "/:quizId",
    authenticate,
    isValidQuizId,
    // validateBody(schemas.quizSchemaJoi),
    ctrl.updateQuiz
);

module.exports = router;
