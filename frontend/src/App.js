import React, { Component } from 'react';

import RaceSection from './pages/character-creator/RaceSection';
import ClassSection from './pages/character-creator/ClassSection';
import AbilityScore from './components/AbilityScore';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RaceSection/>
        <ClassSection/>
        <AbilityScore type="STR"/>
      </div>
    );
  }
}

export default App;
