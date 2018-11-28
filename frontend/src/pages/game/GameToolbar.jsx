import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// components
import { Navbar, Row, Col } from 'react-bootstrap';
import CharacterSheetHeader from './CharacterSheetHeader';

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
