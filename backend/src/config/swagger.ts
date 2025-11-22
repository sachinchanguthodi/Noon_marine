import swaggerJsdoc from 'swagger-jsdoc';
import env from './env';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Noon Marine Services API',
      version: '1.0.0',
      description: 'Comprehensive API for marine business operations',
      contact: {
        name: 'Noon Marine',
        email: 'info@noonmarine.com',
        url: 'https://noon-marine.vercel.app',
      },
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
