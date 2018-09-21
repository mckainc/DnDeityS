import React, { Component } from 'react';

import RaceSection from './pages/character-creator/RaceSection';
import ClassSection from './pages/character-creator/ClassSection';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RaceSection/>
        <ClassSection/>
      </div>
    );
  }
}

export default App;
