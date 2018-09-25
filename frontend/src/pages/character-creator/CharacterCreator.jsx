import React, { Component } from 'react';

// components
import RaceSection from './RaceSection';
import ClassSection from './ClassSection';
import ScoreSection from './ScoreSection';
import SiteNavBar from '../../components/SiteNavBar';

class CharacterCreator extends Component {
  render() {
    return (
      <div className="CharacterCreator">
        <SiteNavBar/>
        <RaceSection/>
        <ClassSection/>
        <ScoreSection/>
      </div>
    );
  }
}

export default CharacterCreator;