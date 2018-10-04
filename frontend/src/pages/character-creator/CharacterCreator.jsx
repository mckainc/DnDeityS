import React, { Component } from 'react';
import axios from 'axios';

// types
import { Map } from 'immutable';
import RaceType from '../../objects/RaceType';
import serverURL from '../../objects/url.js';

// components
import RaceSection from './RaceSection';
import ClassSection from './ClassSection';
import ScoreSection from './ScoreSection';
import EquipmentSection from './equipment/EquipmentSection';
import SpellSection from './spells/SpellSection';
import DescriptionSection from './DescriptionSection';
import SiteNavBar from '../../components/SiteNavBar';
import CharacterNavBar from '../../components/CharacterNavBar';

import { FormControl, Grid, Row, Col } from 'react-bootstrap';

import './CharacterCreator.css';

const sections = ['Race', 'Class', 'Ability Scores', 'Equipment', 'Spells', 'Description'];

class CharacterCreator extends Component {
  constructor(props) {
    super(props);

    // create a reference for each section to use for scrolling
    const refs = [];
    for (let i = 0;i < sections.length; i++) {
      refs.push(React.createRef());
    }

    this.state = {
      character: {},
      refs: refs.slice(),
      races: new Map(),
      classes: new Map(),
      equipment: new Map(),
      spells: new Map(),
    }
  }

  componentWillMount() {
    const server = axios.create({
      baseURL: serverURL,
    });

    // Make server request for list of races
    server.get('/races')
      .then((response) => {
        let races = new Map();
        response.data.forEach(payload => {
          const race = new RaceType(payload[1], payload[2]);
          races = races.set(race.name, race);
        });
        this.setState({ races });
      });
    
    // Make server request for list of classes
    server.get('/classes')
      .then((response) => {
        let classes = new Map();
        response.data.forEach(payload => {
          const c = new RaceType(payload[1], payload[2]);
          classes = classes.set(c.name, c);
        });
        this.setState({ classes });
      });
    
    // Make server request for list of equipment
    server.get('/equipment')
      .then((response) => {
        let equipment = new Map();
        response.data.forEach(payload => {
          const item = new RaceType(payload[1], payload[2]);
          equipment = equipment.set(item.name, item);
        });
        this.setState({ equipment });
      });

    // Make server request for list of spells
    server.get('/spells')
      .then((response) => {
        let spells = new Map();
        response.data.forEach(payload => {
          const spell = new RaceType(payload[1], payload[2]);
          spells = spells.set(spell.name, spell);
        });
        this.setState({ spells });
      });
  }

  changeCharacter = (property, value) => {
    const { character } = this.state;
    character[property] = value;
    console.log(character);
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
              <FormControl id="name" placeholder="Enter Character Name" type="text" onChange={(e) => this.changeCharacter('name', e.target.value)}/>
              <RaceSection ref={this.state.refs[0]} races={this.state.races} changeCharacter={this.changeCharacter}/>
              <ClassSection ref={this.state.refs[1]} classes={this.state.classes} changeCharacter={this.changeCharacter}/>
              <ScoreSection ref={this.state.refs[2]}/>
              <EquipmentSection ref={this.state.refs[3]} equipment={this.state.equipment}/>
              <SpellSection ref={this.state.refs[4]} spells={this.state.spells}/>
              <DescriptionSection ref={this.state.refs[5]} changeCharacter={this.changeCharacter}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default CharacterCreator;