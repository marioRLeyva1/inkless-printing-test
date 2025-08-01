import React, { useState } from 'react';
import './App.css';
import InstallPrompt from './components/InstallPrompt';

function App() {
  const [wsStatus, setWsStatus] = useState<{ [key: string]: string }>({});
  const [connections, setConnections] = useState<{ [key: string]: WebSocket | null }>({});

  const connectAndSendMessage = (port: string) => {
    // Check if already connected
    if (connections[port] && connections[port]?.readyState === WebSocket.OPEN) {
      // Already connected, just send message
      connections[port]?.send("Printer working!!");
      alert(`Sent message to port ${port}: Printer working!!`);
      return;
    }

    // If connection exists but is not open, close it first
    if (connections[port]) {
      connections[port]?.close();
    }

    try {
      const ws = new WebSocket(`ws://localhost:${port}`);
      
      ws.onopen = () => {
        alert(`Connected to WebSocket on port ${port}`);
        setWsStatus(prev => ({ ...prev, [port]: 'Connected' }));
        setConnections(prev => ({ ...prev, [port]: ws }));
        
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
        setConnections(prev => ({ ...prev, [port]: null }));
      };

      ws.onclose = () => {
        alert(`Disconnected from WebSocket on port ${port}`);
        setWsStatus(prev => ({ ...prev, [port]: 'Disconnected' }));
        setConnections(prev => ({ ...prev, [port]: null }));
      };

    } catch (error) {
      alert(`Failed to connect to WebSocket on port ${port}: ${error}`);
      setWsStatus(prev => ({ ...prev, [port]: 'Failed to connect' }));
      setConnections(prev => ({ ...prev, [port]: null }));
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
            Print (Port 40213) - Plain Mode
          </button>
          <button 
            className="printer-button"
            onClick={() => connectAndSendMessage('9100')}
          >
            Print (Port 9100) - Plain Mode
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
