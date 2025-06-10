


import axios from 'axios';

async function testEndpoints() {
  const baseURL = 'http://localhost:58968';

  // Test SET endpoint
  console.log('Testing SET endpoint...');
  const setResponse = await axios.post(`${baseURL}/mcp/set`, {
    text: 'Buy groceries',
    time: '2025-06-11T14:30:00'
  });
  console.log('SET Response:', setResponse.data);

  const reminderId = setResponse.data.data.id;

  // Test SAVE endpoint
  console.log('\nTesting SAVE endpoint...');
  const saveResponse = await axios.post(`${baseURL}/mcp/save`, {
    id: reminderId
  });
  console.log('SAVE Response:', saveResponse.data);

  // Test LIST endpoint
  console.log('\nTesting LIST endpoint...');
  const listResponse = await axios.get(`${baseURL}/mcp/list`);
  console.log('LIST Response:', listResponse.data);

  // Test DELETE endpoint
  console.log('\nTesting DELETE endpoint...');
  const deleteResponse = await axios.post(`${baseURL}/mcp/delete`, {
    id: reminderId
  });
  console.log('DELETE Response:', deleteResponse.data);

  // Verify deletion by listing again
  console.log('\nVerifying deletion with LIST endpoint...');
  const listAfterDelete = await axios.get(`${baseURL}/mcp/list`);
  console.log('LIST after DELETE:', listAfterDelete.data);
}

testEndpoints().catch(console.error);


