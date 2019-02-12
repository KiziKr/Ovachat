import React, {Component} from 'react';
import {Provider} from 'react-redux';
import AuthUser from './components/auth/AuthUser';
import io from 'socket.io-client';
import './App.css';

import {store} from './store'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      socket: io('http://localhost:3001'),
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Provider store={store}>
            <AuthUser />
          </Provider>
        </header>
      </div>
    );
  }
}

export default App;
