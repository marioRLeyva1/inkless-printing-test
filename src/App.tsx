import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Inkless Printing Test</h1>
        <div className="button-container">
          <button className="printer-button">
            Connect printer
          </button>
          <button className="printer-button">
            Print
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
