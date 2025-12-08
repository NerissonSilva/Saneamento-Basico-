import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Saneamento Recife/PE',
      version: '1.0.0',
      description: 'API para estatísticas de saneamento básico em Recife, Pernambuco',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Desenvolvimento' },
      { url: 'https://recife-saneamento.onrender.com', description: 'Produção' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

export default swaggerJsdoc(options);
