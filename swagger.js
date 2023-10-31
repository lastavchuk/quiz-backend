const swaggerAutogen = require('swagger-autogen')({ openapi: '3.1.0' });
const constants = require('./constants/constants');
require('dotenv').config();

const doc = {
  info: {
    version: '1.0.0',
    title: 'QuizMaster API',
    description: 'Here will be a description!!!!',
  },
  //   servers: [{ url: process.env.BASE_URL }],
  host: process.env.BASE_URL,
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  // tags: [],
  //   definitions: {
  //     Category: {
  //       categoryName: 'Car',
  //       categoryType: constants.audienceArr[0],
  //     },
  //     Feedback: {
  //       quizId: '653b7ab5f18b4cc7fb04f0a2',
  //       userName: 'Alex',
  //       userAvatar:
  //         'https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
  //       rate: 5,
  //       comment: 'Very nice quiz',
  //     },
  //   },
  components: {
    schemas: {
      Category: {
        categoryName: 'Car',
        categoryType: constants.audienceArr[0],
      },
      Feedback: {
        quizId: '653b7ab5f18b4cc7fb04f0a2',
        userName: 'Alex',
        userAvatar:
          'https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        rate: 5,
        comment: 'Very nice quiz',
      },
      audience: {
        '@enum': constants.audienceArr,
      },
      questionType: {
        '@enum': constants.questionType,
      },
      questionBg: {
        '@enum': constants.questionBg,
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
  },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/api/*.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./server');
});
