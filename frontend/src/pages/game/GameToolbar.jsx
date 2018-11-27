import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// components
import { Navbar } from 'react-bootstrap';
import CharacterSheetHeader from './CharacterSheetHeader';

class GameToolbar extends Component {
  render() {
    return (
      <div className="GameToolbar">
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand><Link to="/home">DnDeity</Link></Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <CharacterSheetHeader id="1222864699"/>
      </div>
    );
  }
}

export default GameToolbar;
