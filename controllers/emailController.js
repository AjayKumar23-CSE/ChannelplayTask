// controllers/emailController.js
// Contains controller functions for handling email-related API requests.

import { saveEmail } from '../models/emailModel.js';

/**
 * Controller to handle incoming email POST requests.
 * Expects email data in the request body and saves it to the database.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function handleIncomingEmail(req, res) {
  try {
    const {
      subject,
      sender,
      recipient,
      'body-plain': body,
      From: from,
      To: to,
      Cc: cc,
      'message-id': messageId
    } = req.body;

    // Prepare email data for saving
    const emailData = {
      subject,
      sender,
      recipient,
      body,
      from,
      to,
      cc,
      messageId
    };

    await saveEmail(emailData);
    res.status(200).json({ success: true, message: 'Email saved successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
