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
        url: 'http://test.com',
        email: 'test@email.com',
      },
    },
    servers: [
      {
        url: process.env.BASE_URL,
      },
    ],
    components: {
      securitySchemes: {
        Bearer: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/api/*.js'],
};

module.exports = {
  optionsSwagger,
};
