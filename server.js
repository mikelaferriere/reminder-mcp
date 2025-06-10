const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

// Use environment variable for port or default to 3000
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Root endpoint (for testing)
app.get('/', (req, res) => {
  res.send('Reminder MCP Server is running');
});
 
// MCP Endpoints

/**
 * Set a reminder
 */
app.post('/mcp/set', async (req, res) => {
  const { text, time } = req.body;

  if (!text || !time) {
    return res.status(400).json({ error: 'Text and time are required' });
  }

  try {
    const result = await db.query(
      'INSERT INTO reminders (text, time) VALUES ($1, $2) RETURNING *',
      [text, time]
    );
    const reminder = result.rows[0];
    console.log(`Reminder set: ${JSON.stringify(reminder)}`);

    res.json({
      status: 'success',
      data: {
        id: reminder.id,
        text: reminder.text,
        time: reminder.time
      }
    });
  } catch (error) {
    console.error('Error setting reminder:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Save a reminder (persist it)
 */
app.post('/mcp/save', async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  try {
    // In this implementation, reminders are already saved in the DB
    // We'll just acknowledge the save request
    const result = await db.query('SELECT * FROM reminders WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reminder not found' });
    }

    console.log(`Reminder saved: ${JSON.stringify(result.rows[0])}`);

    res.json({
      status: 'success',
      data: {
        message: `Reminder with ID ${id} has been saved`
      }
    });
  } catch (error) {
    console.error('Error saving reminder:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * List all reminders
 */
app.get('/mcp/list', async (req, res) => {
  try {
    const result = await db.query('SELECT id, text, time FROM reminders');
    res.json({
      status: 'success',
      data: result.rows.map(r => ({
        id: r.id,
        text: r.text,
        time: r.time
      }))
    });
  } catch (error) {
    console.error('Error listing reminders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Delete a reminder
 */
app.post('/mcp/delete', async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  try {
    const result = await db.query('DELETE FROM reminders WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reminder not found' });
    }

    console.log(`Reminder deleted: ${JSON.stringify(result.rows[0])}`);

    res.json({
      status: 'success',
      data: {
        message: `Reminder with ID ${id} has been deleted`
      }
    });
  } catch (error) {
    console.error('Error deleting reminder:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
