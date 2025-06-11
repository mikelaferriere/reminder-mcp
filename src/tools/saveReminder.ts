

import { MCPTool, ToolInputSchema } from 'mcp-framework';
import db from '../db';
import { number } from 'zod';

export default class SaveRemindersTool extends MCPTool {
  name = 'save_reminder';
  description = 'Save a reminder (persist it)';
  schema: ToolInputSchema<{ id: number }> = {
    id: { type: number(), description: 'The ID of the reminder to delete' }
  };

  protected async execute(input: { id: Number}) {
    const { id } = input;

    if (!id) {
      throw new Error('ID is required');
    }

    try {
      // In this implementation, reminders are already saved in the DB
      // We'll just acknowledge the save request
      const result = await db.query('SELECT * FROM reminders WHERE id = $1', [id]);

      if (result.rows.length === 0) {
        throw new Error('Reminder not found');
      }

      console.log(`Reminder saved: ${JSON.stringify(result.rows[0])}`);

      return {
        message: `Reminder with ID ${id} has been saved`
      };
    } catch (error) {
      console.error('Error saving reminder:', error);
      throw new Error('Internal server error');
    }
  }
}

