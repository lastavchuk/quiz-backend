const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

const authRouter = require('./routes/api/auth');
const categoriesRouter = require('./routes/api/categories');
const quizzesRouter = require('./routes/api/quizzes');
const feedbackRouter = require('./routes/api/feedback');
const usersRouter = require('./routes/api/users');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const optionsSwagger = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'QuizMaster API',
      version: '1.0.0',
      description: 'Here will be a description!!!!',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Quiz',
        url: 'test.com',
        email: 'test@email.com',
      },
    },
    servers: [
      {
        url: process.env.BASE_URL,
      },
    ],
  },
  apis: ['./routes/*.js'],
};
const swaggerDocument = swaggerJsdoc(optionsSwagger);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(
  '/api/auth',
  authRouter
  // #swagger.tags = ['Auth']
);
app.use(
  '/api/users',
  usersRouter
  // #swagger.tags = ['Users']
);
app.use('/api/feedback', feedbackRouter);
app.use(
  /*
     #swagger.tags = ['Categories']
     #swagger.security = [{ "apiKeyAuth": [] }] 
    */
  '/api/categories',
  categoriesRouter
);
app.use('/api/quizzes', quizzesRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(({ status = 500, message = 'Server error' }, req, res, next) => {
  res.status(status).json({ message });
});

module.exports = app;
