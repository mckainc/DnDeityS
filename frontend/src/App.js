import React, { Component } from 'react';

// components
import CharacterCreator from './pages/character-creator/CharacterCreator';
import Login from './pages/login-package/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login/>
      </div>
    );
  }
}

export default App;
