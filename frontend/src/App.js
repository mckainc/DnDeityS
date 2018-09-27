import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

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

export default DragDropContext(HTML5Backend)(App);
