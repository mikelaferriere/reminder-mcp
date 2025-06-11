

import { MCPServer } from 'mcp-framework';

// Create a new MCP server
const mcpServer = new MCPServer({
  name: 'Reminder MCP Server',
  version: '1.0.0',
  basePath: __dirname,
  transport: {
    type: 'sse', // Use SSE for web-based clients
    options: {
      port: parseInt(process.env.PORT || '3000', 10)
    }
  }
});

// Start the server
mcpServer.start().then(() => {
  console.log(`MCP Server is running on port ${process.env.PORT || '3000'}`);
}).catch((error) => {
  console.error('Failed to start MCP server:', error);
});

