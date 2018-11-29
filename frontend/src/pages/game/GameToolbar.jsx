import React, { Component } from 'react';

import { Link } from 'react-router-dom';

// components
import { Navbar, Row, Col, Nav, NavItem, Button } from 'react-bootstrap';
import CharacterSheetHeader from './CharacterSheetHeader';
import DiceTray from '../../components/DiceTray';
import Notes from '../../components/Notes';

class GameToolbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.characterId)
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
              <NavItem><Notes characterId={sessionStorage.getItem('character_id')}/></NavItem>
            </Nav>
            {this.props.characterId === '-1' &&
              <Nav pullRight>
                <NavItem><Button bsSize="xsmall">Initiative</Button></NavItem>
              </Nav>
            }
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
