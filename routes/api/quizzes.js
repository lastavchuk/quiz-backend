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
    validateBody(schemas.addQuizSchemaJoi),
    ctrl.addQuiz
);

router.put(
    "/:quizId",
    authenticate,
    isValidQuizId,
    validateBody(schemas.updateQuizSchemaJoi),
    ctrl.updateQuiz
);

router.delete("/:quizId", authenticate, isValidQuizId, ctrl.daleteQuiz);

router.get("/myquiz", authenticate, ctrl.getAllQuizCreateUser);
router.patch("/:id", authenticate, ctrl.getOnePassed); // ???????
router.get("/:id", authenticate, ctrl.getOneQuiz);
router.get("/", authenticate, ctrl.getSearchQuiz);

//  TESTING ROUTES
router.get("/random", ctrl.getRandomQuizzes);

module.exports = router;
