import React, { Component } from 'react';

import { Link } from 'react-router-dom';

// components
import { Navbar, Row, Nav, NavItem, Button } from 'react-bootstrap';
import DiceTray from '../../components/DiceTray';
import Notes from '../../components/Notes';

class GameToolbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="GameToolbar">
        <Row>
          <Navbar fluid>
            <Navbar.Header>
              <Navbar.Brand><Link to="/home">DnDeity</Link></Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight>
              <NavItem><DiceTray/></NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem>
                <Button bsSize="xsmall" onClick={this.props.showNotes}>Notes</Button>
              </NavItem>
            </Nav>
            {this.props.characterId === '-1' &&
              <Nav pullRight>
                <NavItem>
                  <Button bsSize="xsmall" onClick={this.props.sendInitiativeRequest}>Initiative</Button>
                </NavItem>
              </Nav>
            }
          </Navbar>
        </Row>
      </div>
    );
  }
}

export default GameToolbar;
//<Notes characterId={sessionStorage.getItem('character_id')}/>