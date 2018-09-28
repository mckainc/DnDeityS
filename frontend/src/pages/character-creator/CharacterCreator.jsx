import React, { Component } from 'react';

// components
import RaceSection from './RaceSection';
import ClassSection from './ClassSection';
import ScoreSection from './ScoreSection';
import EquipmentSection from './equipment/EquipmentSection';
import SiteNavBar from '../../components/SiteNavBar';
import CharacterNavBar from '../../components/CharacterNavBar';

import { FormControl, Grid, Row, Col } from 'react-bootstrap';

import './CharacterCreator.css';

class CharacterCreator extends Component {
  render() {
    return (
      <div className="CharacterCreator">
        <SiteNavBar/>
        <Grid fluid className="character-grid">
          <Row>
            <Col xs={1} md={1}>
              <CharacterNavBar/>
            </Col>
            <Col xs={17} md={11}>
              <h1>Character Creator</h1>
              <b>Name: </b>
              <FormControl id="name" placeholder="Enter Character Name" type="text" />
              <RaceSection/>
              <ClassSection/>
              <ScoreSection/>
              <EquipmentSection/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default CharacterCreator;