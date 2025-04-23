// models/emailModel.js
// This module handles all database operations related to emails and threads using Supabase.

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Save an email to the database, creating a thread if necessary.
 * @param {Object} emailData - The email data to save.
 * @returns {Promise<Object>} Success status.
 */
export async function saveEmail(emailData) {
  const {
    subject,
    from,
    to,
    cc,
    body,
    messageId
  } = emailData;

  // Normalize emails: ensure all addresses are trimmed and unique
  const participants = Array.from(new Set([
    from,
    ...(Array.isArray(to) ? to : to?.split(',') || []),
    ...(Array.isArray(cc) ? cc : cc?.split(',') || [])
  ])).map(email => email.trim());

  // 1. Check if a thread exists for this subject and sender
  const { data: existingThreads, error: threadCheckError } = await supabase
    .from('email_threads')
    .select('*')
    .eq('subject', subject)
    .eq('created_by', from)
    .limit(1);

  if (threadCheckError) throw threadCheckError;

  let threadId;

  if (existingThreads && existingThreads.length > 0) {
    // Use existing thread
    threadId = existingThreads[0].id;
  } else {
    // 2. Create a new thread
    const { data: newThread, error: insertThreadError } = await supabase
      .from('email_threads')
      .insert([{
        subject,
        created_by: from,
        participants,
        status: 'open'
      }])
      .select()
      .single();

    if (insertThreadError) throw insertThreadError;
    threadId = newThread.id;
  }

  // 3. Insert the email message into email_messages table
  const { error: insertMessageError } = await supabase
    .from('email_messages')
    .insert([{
      thread_id: threadId,
      direction: 'inbound',
      from_email: from,
      to_emails: (Array.isArray(to) ? to : to?.split(',') || []).map(t => t.trim()),
      cc_emails: (Array.isArray(cc) ? cc : cc?.split(',') || []).map(c => c.trim()),
      body,
      received_at: new Date(),
      message_id: messageId
    }]);

  if (insertMessageError) throw insertMessageError;

  return { success: true };
}
