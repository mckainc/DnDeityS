import React, { Component } from 'react';

// components
import { Navbar, Nav, NavItem} from 'react-bootstrap';

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
        </Navbar>
      </div>
    );
  }
}

export default SiteNaveBar;
