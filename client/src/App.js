import React, {Component} from 'react';
import { connect } from 'react-redux';
import AuthPage from './components/AuthPage/AuthPage';
import io from 'socket.io-client';
import './App.css';

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
        {(!this.props.loggedIn)?
            <AuthPage /> : null }
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggedIn } = state.authReducer
  return {
      loggedIn
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 