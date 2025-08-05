import React, { useState } from 'react';
import './App.css';
import InstallPrompt from './components/InstallPrompt';
import { buildMessage } from './utils/message';


function App() {
  const [wsStatus, ] = useState<{ [key: string]: string }>({});

  const message = "Mariano AI Printer successfully connected! Awesome! Viva BM!";
  const messageToPrint = buildMessage(message);
  console.log("Message to print: " + messageToPrint);

  const connectToWebsocket = () => {
    try {
      const ws = new WebSocket("wss://s15025.blr1.piesocket.com/v3/1?api_key=fSMfmoPLnW4Rt6L02b1jxFI1HrFK9jgVl42cn0Wq&notify_self=1")
      onWebSocketOpen(ws);
    } catch (error) {
      console.error("Error connecting to WebSocket: ", error);
    }
  }

  const onWebSocketOpen = (ws: WebSocket) => {
   ws.onopen = () => {
    //alert(`Connected to WebSocket: ${ws.url}`);
    ws.send(JSON.stringify({ status: true, message: "browser connected" }))
   }
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Inkless Printing Test</h1>
        <div className="button-container">

          <button 
            className="printer-button"
            onClick={() => connectToWebsocket()}
          >
            Connect to WebSocket
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
