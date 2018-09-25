import React, { Component } from 'react';

// components
import CharacterCreator from './pages/character-creator/CharacterCreator';

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
