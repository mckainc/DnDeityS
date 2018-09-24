import React, { Component } from 'react';

import RaceSection from './RaceSection';
import ClassSection from './ClassSection';
import ScoreSection from './ScoreSection';

class CharacterCreator extends Component {
  render() {
    return (
      <div className="CharacterCreator">
        <RaceSection/>
        <ClassSection/>
        <ScoreSection/>
      </div>
    );
  }
}

export default CharacterCreator;