const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/second-brain/chat:
 *   post:
 *     summary: Chat with the second brain AI
 *     consumes:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               message:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   role:
 *                     type: string
 *                   content:
 *                     type: string
 *                   parts:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         type:
 *                           type: string
 *                         text:
 *                           type: string
 *               selectedChatModel:
 *                 type: string
 *               selectedVisibilityType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Assistant response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 role:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 parts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                       text:
 *                         type: string
 */
router.post('/chat', (req, res) => {
  // For now, just echo a static response in the required format
  const now = new Date().toISOString();
  res.status(200).json({
    id: 'assistant-message-uuid',
    role: 'assistant',
    createdAt: now,
    parts: [
      { type: 'text', text: "I'm good, how can I help you today?" }
    ]
  });
});

module.exports = router; 