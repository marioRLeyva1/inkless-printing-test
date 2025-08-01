import React, { useState } from 'react';
import './App.css';
import InstallPrompt from './components/InstallPrompt';

function App() {
  const [wsStatus, setWsStatus] = useState<{ [key: string]: string }>({});

  const connectAndSendMessage = (port: string) => {
    try {
      const ws = new WebSocket(`ws://localhost:${port}`);
      
      ws.onopen = () => {
        alert(`Connected to WebSocket on port ${port}`);
        setWsStatus(prev => ({ ...prev, [port]: 'Connected' }));
        
        // Send the message
        ws.send("Printer working!!");
        alert(`Sent message to port ${port}: Printer working!!`);
      };

      ws.onmessage = (event) => {
        alert(`Received from port ${port}: ${event.data}`);
      };

      ws.onerror = (error) => {
        alert(`WebSocket error on port ${port}: ${error}`);
        setWsStatus(prev => ({ ...prev, [port]: 'Error' }));
      };

      ws.onclose = () => {
        alert(`Disconnected from WebSocket on port ${port}`);
        setWsStatus(prev => ({ ...prev, [port]: 'Disconnected' }));
      };

    } catch (error) {
      alert(`Failed to connect to WebSocket on port ${port}: ${error}`);
      setWsStatus(prev => ({ ...prev, [port]: 'Failed to connect' }));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Inkless Printing Test</h1>
        <div className="button-container">
          <button 
            className="printer-button"
            onClick={() => connectAndSendMessage('40213')}
          >
            Print (Port 40213)
          </button>
          <button 
            className="printer-button"
            onClick={() => connectAndSendMessage('9100')}
          >
            Print (Port 9100)
          </button>
        </div>
        <div className="status-container">
          <p>Port 40213: {wsStatus['40213'] || 'Not connected'}</p>
          <p>Port 9100: {wsStatus['9100'] || 'Not connected'}</p>
        </div>
      </header>
      <InstallPrompt />
    </div>
  );
}

export default App;
