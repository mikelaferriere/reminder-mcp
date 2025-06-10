



import { Pool } from 'pg';

async function initializeDatabase() {
  const db = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'reminder_mcp',
    password: process.env.DB_PASSWORD || 'password',
    port: parseInt(process.env.DB_PORT || '5432', 10),
  });

  try {
    // Create reminders table if it doesn't exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS reminders (
        id SERIAL PRIMARY KEY,
        text VARCHAR(255) NOT NULL,
        time TIMESTAMP NOT NULL
      );
    `);

    console.log('Reminders table created successfully');

    // Check if the table is empty and add a sample reminder if needed
    const result = await db.query('SELECT COUNT(*) FROM reminders');
    const count = parseInt(result.rows[0].count, 10);

    if (count === 0) {
      // Insert a sample reminder
      await db.query(`
        INSERT INTO reminders (text, time)
        VALUES ('Welcome to Reminder MCP!', NOW() + INTERVAL '1 hour')
      `);
      console.log('Sample reminder added successfully');
    } else {
      console.log('Reminders table already contains data');
    }

  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await db.end();
  }
}

initializeDatabase();


