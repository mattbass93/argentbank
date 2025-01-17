import { useState } from 'react';

const App = () => {
  const [backendMessage, setBackendMessage] = useState('');

  const testBackendConnection = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/ping'); // Endpoint de test
      const data = await response.json();
      setBackendMessage(data.message);
    } catch (error) {
      console.error('Error connecting to backend:', error);
      setBackendMessage('Error connecting to backend');
    }
  };

  return (
    <div>
      <h1>Frontend-Backend Test</h1>
      <button onClick={testBackendConnection}>Test Backend Connection</button>
      <p>Response from Backend: {backendMessage}</p>
    </div>
  );
};

export default App;


