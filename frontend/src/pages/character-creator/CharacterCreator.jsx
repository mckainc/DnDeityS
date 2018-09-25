import React, { Component } from 'react';

// components
import RaceSection from './RaceSection';
import ClassSection from './ClassSection';
import ScoreSection from './ScoreSection';
import SiteNavBar from '../../components/SiteNavBar';

import { FormControl } from 'react-bootstrap';

class CharacterCreator extends Component {
  render() {
    return (
      <div className="CharacterCreator">
        <h1>Character Creator</h1>
        <b>Name: </b>
        <FormControl id="name" placeholder="Enter Character Name" type="text" />
        <SiteNavBar/>
        <RaceSection/>
        <ClassSection/>
        <ScoreSection/>
      </div>
    );
  }
}

export default CharacterCreator;