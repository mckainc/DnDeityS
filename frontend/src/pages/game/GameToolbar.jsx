import React, { Component } from 'react';

import { Link } from 'react-router-dom';

// components
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import DiceTray from '../../components/DiceTray'

class GameToolbar extends Component {
  render() {
    return (
      <div className="GameToolbar">
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand><Link to="/home">DnDeity</Link></Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem><DiceTray/></NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default GameToolbar;
