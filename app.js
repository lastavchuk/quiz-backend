const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./routes/api/auth');
const categoriesRouter = require('./routes/api/categories');
const quizzesRouter = require('./routes/api/quizzes');
const questionsRouter = require('./routes/api/questions');
const feedbackRouter = require('./routes/api/feedback');
const usersRouter = require('./routes/api/users');

const swaggerUi = require('swagger-ui-express');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/quizzes', quizzesRouter);
app.use('/api/questions', questionsRouter);

const swaggerDocument = require('./swager.json');
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(({ status = 500, message = 'Server error' }, req, res, next) => {
  res.status(status).json({ message });
});

module.exports = app;
