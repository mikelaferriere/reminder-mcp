
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 58968; // Using one of the provided ports

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory storage for reminders
let reminders = [];
let reminderCounter = 1;

// Root endpoint (for testing)
app.get('/', (req, res) => {
  res.send('Reminder MCP Server is running');
});

// MCP Endpoints

/**
 * Set a reminder
 */
app.post('/mcp/set', (req, res) => {
  const { text, time } = req.body;

  if (!text || !time) {
    return res.status(400).json({ error: 'Text and time are required' });
  }

  const id = reminderCounter++;
  const reminder = { id, text, time };

  reminders.push(reminder);
  console.log(`Reminder set: ${JSON.stringify(reminder)}`);

  res.json({
    status: 'success',
    data: {
      id: reminder.id,
      text: reminder.text,
      time: reminder.time
    }
  });
});

/**
 * Save a reminder (persist it)
 */
app.post('/mcp/save', (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  // In this in-memory implementation, reminders are already "saved"
  // We'll just acknowledge the save request
  const reminder = reminders.find(r => r.id === id);

  if (!reminder) {
    return res.status(404).json({ error: 'Reminder not found' });
  }

  console.log(`Reminder saved: ${JSON.stringify(reminder)}`);

  res.json({
    status: 'success',
    data: {
      message: `Reminder with ID ${id} has been saved`
    }
  });
});

/**
 * List all reminders
 */
app.get('/mcp/list', (req, res) => {
  res.json({
    status: 'success',
    data: reminders.map(r => ({
      id: r.id,
      text: r.text,
      time: r.time
    }))
  });
});

/**
 * Delete a reminder
 */
app.post('/mcp/delete', (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  const index = reminders.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Reminder not found' });
  }

  const [deletedReminder] = reminders.splice(index, 1);
  console.log(`Reminder deleted: ${JSON.stringify(deletedReminder)}`);

  res.json({
    status: 'success',
    data: {
      message: `Reminder with ID ${id} has been deleted`
    }
  });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
