import React, { Component } from 'react';

// components
import CharacterCreator from './pages/character-creator/CharacterCreator';
import login from './components/login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CharacterCreator/>
      </div>
    );
  }
}

export default App;
