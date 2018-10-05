import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// types
import serverURL from '../../objects/url.js';
import { Map } from 'immutable';

// components
import SiteNavBar from '../../components/SiteNavBar';
import CharacterListItem from './CharacterListItem';

import './CharacterList.css';

class CharacterList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: new Map(),
    }
  }

  componentWillMount() {
    const server = axios.create({
      baseURL: serverURL,
    });

    const userId = localStorage.getItem('user_id');
    
    // Get user's characters
    server.get('/characters/' + userId)
      .then(response => {
        let characters = new Map();
        response.data.forEach(payload => {
          const character = {};
          character.id = payload[0];
          character.name = payload[1];
          character.race = payload[2];
          character.class = payload[3];
          characters = characters.set(character.id, character);
        });
        this.setState({ characters });
      });
  }

  deleteCharacter = (characterId) => {
    const server = axios.create({
      baseURL: serverURL,
    });

    const userId = localStorage.getItem('user_id');

    // Delete Character
    server.delete('/character/' + characterId)
      .then(() => {
        // Get user's characters
        server.get('/characters/' + userId)
        .then(response => {
          let characters = new Map();
          response.data.forEach(payload => {
            const character = {};
            character.id = payload[0];
            character.name = payload[1];
            character.race = payload[2];
            character.class = payload[3];
            characters = characters.set(character.id, character);
          });
          this.setState({ characters });
        });
      })
  }

  render() {
    const { characters } = this.state;
    return (
      <div className="CharacterList">
        <SiteNavBar/>
        <div className="container">
          <div className="character-list-content">
            <h1>DnDeity</h1>
            <br />
            <h2>Characters</h2>
            <Link to="/CharacterCreator">
              Create a new character!
            </Link>
            <h3>Character List</h3>
            {characters.valueSeq().map(character => (
              <CharacterListItem character={character} deleteCharacter={this.deleteCharacter}/>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default CharacterList;