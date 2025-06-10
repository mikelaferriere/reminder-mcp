

# Reminder MCP

Reminder MCP is a simple reminder service that allows users to create, manage, and receive reminders. This project is built with Node.js and provides a RESTful API for interacting with the reminder system.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
  - [Using Docker (Recommended)](#using-docker-recommended)
  - [Without Docker](#without-docker)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create and manage reminders with specific dates and times
- Receive notifications for upcoming reminders
- Simple RESTful API for integration with other services

## Installation

### Using Docker (Recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/mikelaferriere/reminder-mcp.git
   cd reminder-mcp
   ```

2. Build and run using Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. The API will be available at `http://localhost:3000`.

The server listens on port 3000 by default, but you can override this by setting the PORT environment variable in the docker-compose.yml file.

### Setting Up PostgreSQL Database

1. Build and run the services with Docker Compose:
   ```bash
   docker-compose up --build
   ```

2. Run the database migration to create the reminders table (this will also add a sample reminder):
   ```bash
   docker exec -it $(docker-compose ps -q reminder-mcp) node migrations/init_db.js
   ```

3. The application will automatically connect to the PostgreSQL database using the configuration in `docker-compose.yml`.

### Without Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/mikelaferriere/reminder-mcp.git
   cd reminder-mcp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (if needed):
   Create a `.env` file in the root directory and add any required configuration.

## Usage

1. Start the server:
   ```bash
   node server.js
   ```

2. The API will be available at `http://localhost:3000`.

## API Endpoints

The following endpoints are available:

- `GET /`: Check if the server is running
- `POST /mcp/set`: Set a new reminder
  - Request body:
    ```json
    {
      "text": "string",
      "time": "ISO string"
    }
    ```
- `POST /mcp/save`: Save (persist) a reminder by ID
  - Request body:
    ```json
    {
      "id": "number"
    }
    ```
- `GET /mcp/list`: List all reminders
- `POST /mcp/delete`: Delete a reminder by ID
  - Request body:
    ```json
    {
      "id": "number"
    }
    ```

## Testing

To test the API endpoints, you can use the provided test script:

```bash
node test_endpoints.js
```

This will run a series of tests against the available endpoints to ensure they're working correctly.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes and commit them (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

## Integration with OpenWebUI

To integrate Reminder MCP with OpenWebUI, follow these steps:

1. **Set up OpenWebUI**:
   - Follow the instructions in the OpenWebUI documentation to set up and configure your instance.
   - Make sure OpenWebUI is running and accessible.

2. **Configure Reminder MCP API Endpoints**:
   - Ensure that the Reminder MCP service is running and accessible at a specific URL (e.g., `http://localhost:3000`).

3. **Create an Integration Script**:
   - Create a script in your OpenWebUI project to interact with the Reminder MCP API.
   - Use HTTP requests to call the Reminder MCP endpoints from within OpenWebUI.

4. **Example Integration Code**:
   ```javascript
   const axios = require('axios');

   // Set the base URL for the Reminder MCP service
   const REMINDER_API_URL = 'http://localhost:3000';

   // Function to create a new reminder
   async function createReminder(text, time) {
     try {
       const response = await axios.post(`${REMINDER_API_URL}/mcp/set`, { text, time });
       console.log('Reminder created:', response.data);
       return response.data;
     } catch (error) {
       console.error('Error creating reminder:', error);
       throw error;
     }
   }

   // Function to list all reminders
   async function listReminders() {
     try {
       const response = await axios.get(`${REMINDER_API_URL}/mcp/list`);
       console.log('Reminders:', response.data);
       return response.data;
     } catch (error) {
       console.error('Error listing reminders:', error);
       throw error;
     }
   }

   // Example usage
   (async () => {
     await createReminder('Test Reminder', new Date(Date.now() + 60000).toISOString());
     const reminders = await listReminders();
     console.log('All reminders:', reminders);
   })();
   ```

5. **Add the Integration to OpenWebUI**:
   - Integrate the above script into your OpenWebUI project, ensuring it's called at appropriate times (e.g., when a user creates or views reminders).

6. **Test the Integration**:
   - Test the integration by creating and listing reminders through the OpenWebUI interface.
   - Ensure that data is correctly passed between OpenWebUI and Reminder MCP.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

