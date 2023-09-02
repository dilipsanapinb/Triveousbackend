const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJsdoc = YAML.load('api.yaml');

const options = {
    customSiteTitle:"Node.js Ecommerce Backend API doscumentation"
}

module.exports={swaggerServe:swaggerUI.serve,swaggerSetup:swaggerUI.setup(swaggerJsdoc)}