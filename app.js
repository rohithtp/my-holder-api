// app.js
   const express = require('express');
   const swaggerUi = require('swagger-ui-express');
   const swaggerJSDoc = require('swagger-jsdoc');
   const userRoutes = require('./routes/user'); // Import user routes
   const secondBrainRoutes = require('./routes/secondBrain'); // Import second brain routes

   const app = express();
   const port = 8800;

   // Swagger definition
   const swaggerOptions = {
       swaggerDefinition: {
           openapi: '3.0.0',
           info: {
               title: 'My API',
               version: '1.0.0',
               description: 'API documentation using Swagger',
           },
           servers: [
               {
                   url: `http://localhost:${port}`,
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
       },
       apis: ['./routes/*.js'], // Path to your API docs
   };

   const swaggerDocs = swaggerJSDoc(swaggerOptions);
   app.use(express.json());
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
   app.use('/users', userRoutes);
   app.use('/api/second-brain', secondBrainRoutes);
   

   app.listen(port, () => {
       console.log(`Server running at http://localhost:${port}`);
   });
