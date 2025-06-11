
import { MCPTool, ToolInputSchema } from 'mcp-framework';
import db from '../db';
import { number } from 'zod';

export default class DeleteReminderTool extends MCPTool {
  name = 'delete_reminder';
  description = 'Delete a reminder';
  schema: ToolInputSchema<{ id: number }> = {
    id: { type: number(), description: 'The ID of the reminder to delete' }
  };
  
  protected async execute(input: { id: Number }) {
    const { id } = input;

    if (!id) {
      throw new Error('ID is required');
    }

    try {
      const result = await db.query('DELETE FROM reminders WHERE id = $1 RETURNING *', [id]);

      if (result.rows.length === 0) {
        throw new Error('Reminder not found');
      }

      console.log(`Reminder deleted: ${JSON.stringify(result.rows[0])}`);

      return {
        message: `Reminder with ID ${id} has been deleted`
      };
    } catch (error) {
      console.error('Error deleting reminder:', error);
      throw new Error('Internal server error');
    }
  }
}
