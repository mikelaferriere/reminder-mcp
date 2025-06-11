

import { MCPTool, ToolInputSchema } from 'mcp-framework';
import db from '../db';

export default class ListRemindersTool extends MCPTool {
  name = 'listr_reminder';
  description = 'List reminders';
  schema: ToolInputSchema<{}> = {};

  protected async execute() {
    try {
      const result = await db.query('SELECT id, text, time FROM reminders');
      return result.rows.map(r => ({
        id: r.id,
        text: r.text,
        time: r.time
      }));
    } catch (error) {
      console.error('Error listing reminders:', error);
      throw new Error('Internal server error');
    }
  }
}

