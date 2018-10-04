import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// components
import SiteNavBar from '../../components/SiteNavBar';
import CharacterListItem from './CharacterListItem';

import './CharacterList.css';

const character = {
  name: 'Nick',
}

class CharacterList extends Component {
  render() {
    return (
      <div className="CharacterList">
        <SiteNavBar/>
        <div className="character-list-content">
          <h1>Character List</h1>
          <Link to="/CharacterCreator">
            Character Creator
          </Link>
          <CharacterListItem character={character} />
        </div>
      </div>
    );
  }
}

export default CharacterList;