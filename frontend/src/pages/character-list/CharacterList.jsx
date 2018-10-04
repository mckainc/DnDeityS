import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// components
import SiteNavBar from '../../components/SiteNavBar';

import './CharacterList.css';

class CharacterList extends Component {
  render() {
    return (
      <div className="CharacterList">
        <SiteNavBar/>
        <div className="character-list-content">
          <h1>Character List</h1>
          <Link to="/CharacterCreater">
            Character Creator
          </Link>
        </div>
      </div>
    );
  }
}

export default CharacterList;