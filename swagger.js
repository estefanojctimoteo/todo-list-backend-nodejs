const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger_output.json';

const endpointsFiles = [
  './users/routes/users.routes.config',
];

swaggerAutogen(outputFile, endpointsFiles);