import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// components
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';

import './SiteNavBar.css';
import '../components/LevelUpConfermation'
import LevelUpConfermation from '../components/LevelUpConfermation';

class SiteNaveBar extends Component {
  render() {
    return (
      <div className="SiteNavBar">
        <Navbar fixedTop fluid>
          <Navbar.Header>
            <Navbar.Brand><Link to="/home">DnDeity</Link></Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem><Link to="/CharacterList">Characters</Link></NavItem>
          </Nav>
          {this.props.enableSave &&
          <Nav pullRight>
            <NavItem>
                <LevelUpConfermation/>
            </NavItem>
            <NavItem>
              <Button className="save" bsSize="xsmall" onClick={this.props.saveCharacter}>Save</Button>
            </NavItem>
          </Nav>
          }
        </Navbar>
      </div>
    );
  }
}

export default SiteNaveBar;
