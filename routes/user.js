// routes/user.js

   const express = require('express');
   const router = express.Router();

   /**
    * @swagger
    * /users/user:
    *   get:
    *     summary: Retrieve a list of users
    *     responses:
    *       200:
    *         description: A list of users
    */

   router.get('/user', (req, res) => {
       res.status(200).json([{ name: 'John Doe' }, { name: 'Jane Doe' }]);
   });

   /**
    * @swagger
    * /users/answer:
    *   post:
    *     summary: Handle answer query
    *     consumes:
    *       - application/json
    *     parameters:
    *       - in: body
    *         name: query
    *         description: Query to be processed
    *         schema:
    *           type: object
    *           required:
    *             - query
    *           properties:
    *             query:
    *               type: string
    *     responses:
    *       200:
    *         description: Successful response
    */

    router.post('/answer', (req, res) => {
         try {
            console.log(req.body);
            const { query } = req.body;
            if (!query) {
                res.status(400).json({ error: 'Query is required' });
            } else {
                // Process the query here, for demonstration purposes, just echoing it back
                res.status(200).json({ answer: `Received query:\n ${query}` });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });


   module.exports = router;
