

const { Pool } = require('pg');

let db;

if (process.env.DATABASE_URL) {
  // Use a connection string for Heroku or other cloud providers
  db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // For self-signed certificates in development
    },
  });
} else {
  // Local development configuration
  db = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'reminder_mcp',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
  });
}

module.exports = db;

