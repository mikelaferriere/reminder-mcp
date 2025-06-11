


import { MCPTool, ToolInputSchema } from 'mcp-framework';
import db from '../db';
import { string } from 'zod';

export default class SetReminderTool extends MCPTool {
  name = 'set_reminder';
  description = 'Set a reminder with text and time';
  schema: ToolInputSchema<{ text: string, time: string }> = {
    text: { type: string(), description: 'The description of the reminder' },
    time: { type: string(), description: 'The time of the reminder' }
  };


  protected async execute(input: { text: string; time: string; }) {
    const { text, time } = input;

    if (!text || !time) {
      throw new Error('Text and time are required');
    }

    try {
      const result = await db.query(
        'INSERT INTO reminders (text, time) VALUES ($1, $2) RETURNING *',
        [text, time]
      );
      const reminder = result.rows[0];
      console.log(`Reminder set: ${JSON.stringify(reminder)}`);

      return {
        id: reminder.id,
        text: reminder.text,
        time: reminder.time
      };
    } catch (error) {
      console.error('Error setting reminder:', error);
      throw new Error('Internal server error');
    }
  }
}


