// index.js
// Main entry point for the ChannelplayDesk MailService application.
// Sets up Express server, middleware, routes, and health check endpoint.

import 'dotenv/config'; // Loads environment variables from .env
import express from 'express';
import bodyParser from 'body-parser';
import emailRoutes from './routes/emailRoutes.js';

const app = express();

// Middleware to parse URL-encoded and JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Health check endpoint for monitoring and orchestration
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Mount email-related API routes under /api
app.use('/api', emailRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// End of index.js
