import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// types
import serverURL from '../../objects/url.js';
import { Map } from 'immutable';

// components
import { Row, Col, ProgressBar, Media } from 'react-bootstrap';

class CharacterSheetSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character_id: props.id,
      character: {},
      loaded: false
    }
  }

  componentWillMount() {
    const server = axios.create({
      baseURL: serverURL,
    });

    const { character_id } = this.state;
    console.log("Character from api:" + character_id);

    server.get('/character/' + character_id)
      .then(response => {
        const character = {};

        character.ability_scores = JSON.parse(response.data[8]);
        character.inventory = JSON.parse(response.data[10]);
        character.spells = JSON.parse(response.data[13]);
        
        const description = JSON.parse(response.data[14]);  
        const choices = JSON.parse(response.data[11]);
        let languages = [];
        languages.push(choices.race.language);
        languages.push(description.background_language1);
        languages.push(description.background_language2);
        character.languages = languages;

        let proficiencies = [];
        proficiencies.push(choices.race.proficiency);
        choices.class.forEach(function(proficiency) {
          if (typeof proficiency === 'object') {
            let skills = [];
            proficiency.forEach(function(skill) {
              skills.push(skill);
            });
            character.skills = skills;
          }
          else if (proficiency !== "") {
            proficiencies.push(proficiency);
          }
        });
        character.proficiencies = proficiencies;

        this.setState({ character, loaded: true });
      });
  }

  render() {
    const { character, loaded } = this.state;

    if (!loaded) {
      return <div className="CharacterSheetSidebar"></div>;
    }

    return (
      <div className="CharacterSheetSidebar">
        <h1>Sidebar</h1>  
      </div>
    );
  }
}

export default CharacterSheetSidebar;
