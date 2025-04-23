const dotenv = require("dotenv");
dotenv.config();
const swaggerJsDocs = require('swagger-jsdoc')
const PORT = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express');


const definition = {
    openapi: '3.0.0',
    info: {
        title: 'Dating App Documentation',
        description: "API endpoints for Dating app documented on swagger",
        contact: {
            name: "dating app",
            email: process.env.SWAGGER_EMAIL,
            // url: "https://github.com/DesmondSanctity/node-js-swagger"
        },
        version: '1.0.0',
    },
    servers: [
        {
            url: `http://localhost:${PORT}/`,
            description: "Local server"
        },
      
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT', // Optional, if you're using JWT
            },
        },
    },
    security: [
        {
            bearerAuth: [], // Apply globally to all endpoints (optional)
        },
    ],
}




const options = {
    definition,
    apis: ['./src/v1/routes/*.js'], // Specify the path to your routes folder
}


const swaggerSpec = swaggerJsDocs(options);

function swaggerDocs(app, port) {
    // Swagger Page
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    // Documentation in JSON format
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })
}
module.exports = swaggerDocs;