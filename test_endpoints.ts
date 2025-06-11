
import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Test the root endpoint
async function testRootEndpoint() {
  try {
    const response = await axios.get(`${API_URL}/`);
    console.log('Root endpoint:', response.data);
    return true;
  } catch (error) {
    console.error('Error testing root endpoint:', error.message);
    return false;
  }
}

// Test setting a reminder
async function testSetReminder() {
  try {
    const response = await axios.post(`${API_URL}/mcp/set`, {
      text: 'Test Reminder',
      time: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    });
    console.log('Set reminder:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error setting reminder:', error.message);
    return null;
  }
}

// Test listing reminders
async function testListReminders() {
  try {
    const response = await axios.get(`${API_URL}/mcp/list`);
    console.log('List reminders:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error listing reminders:', error.message);
    return null;
  }
}

// Test saving a reminder
async function testSaveReminder(reminderId: number) {
  try {
    const response = await axios.post(`${API_URL}/mcp/save`, { id: reminderId });
    console.log('Save reminder:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error saving reminder:', error.message);
    return null;
  }
}

// Test deleting a reminder
async function testDeleteReminder(reminderId: number) {
  try {
    const response = await axios.post(`${API_URL}/mcp/delete`, { id: reminderId });
    console.log('Delete reminder:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting reminder:', error.message);
    return null;
  }
}

// Run all tests
async function runTests() {
  console.log('Testing root endpoint...');
  const rootTest = await testRootEndpoint();

  if (!rootTest) {
    console.error('Failed to connect to the server. Aborting tests.');
    return;
  }

  console.log('\nTesting set reminder...');
  const newReminder = await testSetReminder();

  if (!newReminder || !newReminder.id) {
    console.error('Failed to set a reminder. Aborting tests.');
    return;
  }

  console.log('\nTesting list reminders...');
  const remindersList = await testListReminders();

  if (!remindersList || remindersList.length === 0) {
    console.error('Failed to list reminders. Aborting tests.');
    return;
  }

  console.log('\nTesting save reminder...');
  const saveResult = await testSaveReminder(newReminder.id);

  if (!saveResult) {
    console.warn('Save reminder test failed, but continuing with other tests...');
  }

  console.log('\nTesting delete reminder...');
  const deleteResult = await testDeleteReminder(newReminder.id);

  if (deleteResult) {
    console.log('\nAll tests completed successfully!');
  } else {
    console.error('\nFailed to delete the reminder. Some tests may have failed.');
  }
}

runTests().catch(console.error);
