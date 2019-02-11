import React, { Component } from 'react';
import AuthUser from './components/auth/AuthUser'
import io from 'socket.io-client';
import './App.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      socket : io('http://localhost:3001'),
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <AuthUser/>
        </header>
      </div>
    );
  }
}

export default App;
