
# Reminder MCP

Reminder MCP is a simple reminder service that allows users to create, manage, and receive reminders. This project is built with Node.js and provides a RESTful API for interacting with the reminder system.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
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

- `GET /reminders`: Get a list of all reminders
- `POST /reminders`: Create a new reminder
  - Request body:
    ```json
    {
      "title": "string",
      "description": "string",
      "dateTime": "ISO string"
    }
    ```
- `GET /reminders/:id`: Get details of a specific reminder by ID
- `PUT /reminders/:id`: Update a specific reminder by ID
  - Request body:
    ```json
    {
      "title": "string",
      "description": "string",
      "dateTime": "ISO string"
    }
    ```
- `DELETE /reminders/:id`: Delete a specific reminder by ID

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

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
