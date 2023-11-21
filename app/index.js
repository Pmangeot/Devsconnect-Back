const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// SWAGGER
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const router = require('./routers');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DevsConnect library API',
      version: '1.0.0',
      description: 'Documentation for DevsConnect API',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['./app/routers/*.js'],
};

const specs = swaggerJsDoc(options);

app.use(cors());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// mise en place des methodes json et URL encoded dans l'app de l'api
app.use('/public', express.static('public')); // fichiers statiques

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  if (req.body.tags) {
    const { tags } = req.body;
    if (typeof tags === 'string') {
      req.body.tags = JSON.parse(req.body.tags);
    }
  }
  if (req.body.availability) {
    const { availability } = req.body;
    if (typeof availability === 'boolean') {
      req.body.availability = JSON.parse(req.body.availability);
    }
  }

  next();
});

// lancement du router
app.use(router);

module.exports = app;
