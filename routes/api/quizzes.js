const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/quizzes");
const schemas = require("../../schemas/auth");
const { validateBody, authenticate, upload } = require("../../middlewares");

router.post("/", authenticate, ctrl.addQuiz);

// router.post(
//     "/register",
//     validateBody(schemas.registerSchemaJoi),
//     ctrl.register
// );

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

module.exports = router;
