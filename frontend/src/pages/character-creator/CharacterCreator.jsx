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
import LevelUpModal from '../../components/LevelUpModal'
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
      character: { description: {} },
      characterId: null,
      loaded: false,
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
    
    // load character data, if any
    const characterId = this.props.match.params.characterId;
    if (typeof characterId !== 'undefined') {
      this.setState({ characterId });
      server.get('/character/' + characterId)
        .then(response => {
          const character = {};
          character.race = response.data[2];
          character.class = response.data[3];
          character.name = response.data[4];
          character.ability_scores = JSON.parse(response.data[8]);
          character.inventory = JSON.parse(response.data[10]);
          character.spells = JSON.parse(response.data[13]);
          character.description = JSON.parse(response.data[14]);
          
          const choices = JSON.parse(response.data[11]);
          character.race_language_choice = choices.race.language;
          character.race_proficiency_choice = choices.race.proficiency;
          character.race_trait_choice = choices.race.trait;
          character.class_proficiency_choices = choices.class;
          this.setState({ character, loaded: true });
        })
    }
  }

  changeCharacter = (property, value, isDescription) => {
    const { character } = this.state;
    if (isDescription === true) {
      character['description'][property] = value;
    } else {
      character[property] = value;
    }
  }

  saveCharacter = () => {
    const { character } = this.state;
    const server = axios.create({
      baseURL: serverURL,
    });

    const userId = localStorage.getItem('user_id');
    character['user_id'] = userId;

    if (this.state.characterId !== null) {
      // Update character
      server.patch('/character/' + this.state.characterId, JSON.stringify(character));
      return;
    }

    // Create character
    server.post('/character', JSON.stringify(character))
      .then(response => {
        const characterId = response.data.CharacterId;
        this.setState({ characterId });
      })
  }

  render() {
    const { character, loaded } = this.state;

    // Allow the page to load if it is pulling in character data
    const characterId = this.props.match.params.characterId;
    if (typeof characterId !== 'undefined' && !loaded) {
      return <div className="CharacterCreator"></div>
    }

    return (
      <div className="CharacterCreator">
        <LevelUpModal/>
        <SiteNavBar enableSave saveCharacter={this.saveCharacter}/>
        <Grid fluid className="character-grid">
          <Row>
            <Col xs={1} md={1}>
              <CharacterNavBar refs={this.state.refs} sections={sections}/>
            </Col>
            <Col xs={17} md={11}>
              <h1>Character Creator</h1>
              <b>Name: </b>
              <FormControl
                id="name"
                placeholder="Enter Character Name"
                type="text"
                onChange={(e) => this.changeCharacter('name', e.target.value)}
                defaultValue={character.name}
              />
              <RaceSection ref={this.state.refs[0]} races={this.state.races} changeCharacter={this.changeCharacter} character={character} loaded={loaded}/>
              <ClassSection ref={this.state.refs[1]} classes={this.state.classes} changeCharacter={this.changeCharacter} character={character} loaded={loaded}/>
              <ScoreSection ref={this.state.refs[2]} changeCharacter={this.changeCharacter} character={character} loaded={loaded}/>
              <EquipmentSection ref={this.state.refs[3]} equipment={this.state.equipment} changeCharacter={this.changeCharacter} character={character} loaded={loaded}/>
              <SpellSection ref={this.state.refs[4]} spells={this.state.spells} changeCharacter={this.changeCharacter} character={character} loaded={loaded}/>
              <DescriptionSection ref={this.state.refs[5]} changeCharacter={this.changeCharacter} character={character}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default CharacterCreator;