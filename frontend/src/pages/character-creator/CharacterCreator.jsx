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

const sections = ['Race', 'Class', 'Ability Scores', 'Equipment'];

class CharacterCreator extends Component {
  constructor(props) {
    super(props);

    // create a reference for each section to use for scrolling
    const refs = [];
    for (let i = 0;i < sections.length; i++) {
      refs.push(React.createRef());
    }

    this.state = {
      refs: refs.slice(),
    }
  }

  render() {
    return (
      <div className="CharacterCreator">
        <SiteNavBar/>
        <Grid fluid className="character-grid">
          <Row>
            <Col xs={1} md={1}>
              <CharacterNavBar refs={this.state.refs} sections={sections}/>
            </Col>
            <Col xs={17} md={11}>
              <h1>Character Creator</h1>
              <b>Name: </b>
              <FormControl id="name" placeholder="Enter Character Name" type="text" />
              <RaceSection ref={this.state.refs[0]}/>
              <ClassSection ref={this.state.refs[1]}/>
              <ScoreSection ref={this.state.refs[2]}/>
              <EquipmentSection ref={this.state.refs[3]}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default CharacterCreator;