// routes/emailRoutes.js
// Defines routes related to email operations.

import express from 'express';
import { handleIncomingEmail } from '../controllers/emailController.js';

const router = express.Router();

// Route to handle incoming emails
router.post('/incoming-email', handleIncomingEmail);

export default router;
