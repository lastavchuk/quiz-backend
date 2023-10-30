const router = require("express").Router();

const ctrl = require("../../controllers/quizzes");
const schemas = require("../../schemas/quizzes");
const {
  validateBody,
  authenticate,
  isValidQuizId,
  upload,
} = require("../../middlewares");

router.post(
<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
);

router.delete("/:quizId", authenticate, isValidQuizId, ctrl.daleteQuiz);

router.get("/myquiz", authenticate, ctrl.getAllQuizCreateUser);
<<<<<<< Updated upstream
router.patch("/:quizId", authenticate, isValidQuizId, ctrl.getOnePassed); // ???????
router.get("/:quizId", authenticate, isValidQuizId, ctrl.getOneQuiz);
=======
router.patch("/:id", authenticate, ctrl.getOnePassed); // ???????

router.get("/:id", authenticate, ctrl.getOneQuiz);
>>>>>>> Stashed changes
router.get("/", authenticate, ctrl.getSearchQuiz);

//  TESTING ROUTES
router.get("/random", ctrl.getRandomQuizzes);

module.exports = router;
