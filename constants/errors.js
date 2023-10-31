// Errors request
const errBadReq = 'Bad Request';
const errNotAuth = 'Not authorized';
const errForbbiden = 'Forbbiden';
const errNotFound = 'Not found';
const errConflict = 'Conflict';

// Errors validations
const errMsgEmailRegexp = 'is not a valid email!';

const errMsgMinPass = 'Password must have a minimum of 6 characters';

const errMsgAuthInvalid = 'Email or password invalid!';

function errFieldIsrequired(field) {
  return `${field} is required!`;
}

function errFieldMinLength(field, min) {
  return `${field} must have a minimum of ${min} characters!`;
}

function errFieldMaxLength(field, max) {
  return `${field} must have a maximum of ${max} characters!`;
}

function errFieldMin(field, min) {
  return `${field} must be at least ${min}!`;
}

function errFieldMax(field, max) {
  return `${field} should be no more than ${max}!`;
}

const errMsgEmailNotVerify = 'Your email address has not been verified';
const errMsgUserNotFound = 'User not found';
const errMsgQuizNotFound = 'Quiz not found';

// Quiz
const errMsgQuizNoQuestions = 'Quiz no questions';
const errMsgQuizMinQuestions = 'There must be at least 1 question in the quiz';
const errMsgQuizMinAnswers = 'The question must have at least 2 answers';
const errMsgQuizMaxAnswers = 'The question should have no more than 4 answers';
const errMsgQuizLengthAnswers = 'There should be only 2 answer options';

module.exports = {
  errBadReq,
  errNotAuth,
  errForbbiden,
  errNotFound,
  errConflict,
  errFieldMin,
  errFieldMax,
  errFieldMinLength,
  errFieldMaxLength,
  errMsgEmailRegexp,
  errMsgMinPass,
  errMsgAuthInvalid,
  errFieldIsrequired,
  errMsgEmailNotVerify,
  errMsgUserNotFound,
  errMsgQuizNotFound,
  errMsgQuizNoQuestions,
  errMsgQuizMinQuestions,
  errMsgQuizMinAnswers,
  errMsgQuizMaxAnswers,
  errMsgQuizLengthAnswers,
};
