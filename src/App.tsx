import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <nav className="navbar" data-testid="navbar" role="navigation">
        <ul>
          <li className="nav-li" data-testid="navli"><a href="#">Home</a></li>
          <li className="nav-li" data-testid="navli"><a href="#">About</a></li>
          <li className="nav-li" data-testid="navli"><a href="#">Skills</a></li>
          <li className="nav-li" data-testid="navli"><a href="#">Works</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
