


const { Pool } = require('pg');

async function createRemindersTable() {
  const db = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'reminder_mcp',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
  });

  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS reminders (
        id SERIAL PRIMARY KEY,
        text VARCHAR(255) NOT NULL,
        time TIMESTAMP NOT NULL
      );
    `);
    console.log('Reminders table created successfully');
  } catch (error) {
    console.error('Error creating reminders table:', error);
  } finally {
    await db.end();
  }
}

createRemindersTable();

