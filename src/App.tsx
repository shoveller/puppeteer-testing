import React, {FormEventHandler, useCallback, useState} from 'react';
import './App.css';
import {LoginForm} from "./Login";
import {SuccessMessage} from "./SuccessMessage";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const onSubmit = useCallback<FormEventHandler>(() => {
    setLoggedIn(value => !value)
  }, [setLoggedIn]);

  return (
    <div className="App">
      <header>
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
      {isLoggedIn ? <SuccessMessage/> : <LoginForm onSubmit={onSubmit}/>}
    </div>
  );
}

export default App;
