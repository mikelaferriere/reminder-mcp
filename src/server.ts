

import { MCPServer } from 'mcp-framework';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a new MCP server
const mcpServer = new MCPServer({
  name: 'Reminder MCP Server',
  version: '1.0.0',
  basePath: __dirname,
  transport: {
    type: 'sse', // Use SSE for web-based clients
    options: {
      port: parseInt(process.env.PORT || '3000', 10),
      cors: {
        allowOrigin: '*'
      }
    }
  }
});

// Start the server
mcpServer.start().then(() => {
  console.log(`MCP Server is running on port ${process.env.PORT || '3000'}`);
}).catch((error) => {
  console.error('Failed to start MCP server:', error);
});

