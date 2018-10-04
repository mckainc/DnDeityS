import React, { Component } from 'react';

// components
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';

import './SiteNavBar.css';

class SiteNaveBar extends Component {
  render() {
    return (
      <div className="SiteNavBar">
        <Navbar fixedTop fluid>
          <Navbar.Header>
            <Navbar.Brand>DnDeity</Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem>Characters</NavItem>
          </Nav>
          {this.props.enableSave &&
          <Nav pullRight>
            <NavItem>
              <Button className="save" bsSize="xsmall">Save</Button>
            </NavItem>
          </Nav>
          }
        </Navbar>
      </div>
    );
  }
}

export default SiteNaveBar;
