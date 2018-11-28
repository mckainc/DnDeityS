import React, { Component } from 'react';

import { Link } from 'react-router-dom';

// components
import { Navbar, Row, Col, Nav, NavItem } from 'react-bootstrap';
import CharacterSheetHeader from './CharacterSheetHeader';
import DiceTray from '../../components/DiceTray';

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
          </Navbar>
        </Row>
        <Row>
          <Col md={9} mdPush={1}>
            <CharacterSheetHeader id={this.props.characterId}/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default GameToolbar;
