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

// router.get("/verify/:verificationToken", ctrl.verifyEmail);

// router.post(
//     "/verify",
//     validateBody(schemas.emailSchemaJoi),
//     ctrl.resendVerifyToken
// );

// router.get("/current", authenticate, ctrl.current);
// router.get("/", authenticate, ctrl.getQuiz);
router.get("/myquiz", authenticate, ctrl.getAllQuizCreateUser);
router.patch("/:id", authenticate, ctrl.getOnePassed); // ???????
router.get("/:id", authenticate, ctrl.getOneQuiz);
router.get("/", authenticate, ctrl.getSearchQuiz);
// router.post("/logout", authenticate, ctrl.logout);

// router.patch(
//     "/avatars",
//     authenticate,
//     upload.single("avatar"),
//     ctrl.updateAvatar
// );
//  TESTING ROUTES
router.get("/random", ctrl.getRandomQuizzes);

module.exports = router;
