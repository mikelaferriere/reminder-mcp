



// MCP Protocol implementation for Reminder MCP
const express = require('express');
const bodyParser = require('body-parser');

// Import the tools
const {
  setReminder,
  saveReminder,
  listReminders,
  deleteReminder
} = require('./mcp_tools');

/**
 * Initialize the MCP protocol with Express
 */
function initMCPProtocol(app) {
  // Middleware to parse JSON bodies
  app.use(bodyParser.json());

  // Root endpoint (for testing)
  app.get('/', (req, res) => {
    res.send('Reminder MCP Server is running');
  });

  // MCP Endpoints
  app.post('/mcp/set', setReminder);
  app.post('/mcp/save', saveReminder);
  app.get('/mcp/list', listReminders);
  app.post('/mcp/delete', deleteReminder);

  return app;
}

module.exports = {
  initMCPProtocol
};


