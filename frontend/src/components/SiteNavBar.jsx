import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import DiceTray from './DiceTray';

// components
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';

import './SiteNavBar.css';

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
          <Nav>
            <NavItem><Link to="/MapList">Maps</Link></NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem><DiceTray/></NavItem>
          </Nav>
          {this.props.enableSave &&
          <Nav pullRight>
            <NavItem>
              <Button className="save" bsSize="xsmall" onClick={this.props.save}>Save</Button>
            </NavItem>
          </Nav>
          }
        </Navbar>
      </div>
    );
  }
}

export default SiteNaveBar;
