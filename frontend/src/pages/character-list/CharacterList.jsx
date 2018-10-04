import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// components
import SiteNavBar from '../../components/SiteNavBar';
import CharacterListItem from './CharacterListItem';

import './CharacterList.css';

const character1 = {
  name: 'Nick',
  race: 'Gnome',
  class: 'Monk',
}

const character2 = {
  name: 'Joe',
  race: 'Elf',
  class: 'Rogue',
}

class CharacterList extends Component {
  render() {
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
            <CharacterListItem character={character1} />
            <CharacterListItem character={character2} />
          </div>
        </div>
      </div>
    );
  }
}

export default CharacterList;