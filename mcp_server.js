




const express = require('express');
const { initMCPProtocol } = require('./mcp_protocol');

// Create the Express app
const app = express();

// Initialize MCP protocol with the app
initMCPProtocol(app);

// Use environment variable for port or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Reminder MCP Server is running on http://0.0.0.0:${PORT}`);
});

