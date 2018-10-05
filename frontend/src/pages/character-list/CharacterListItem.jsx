import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// components
import { Panel, Button, ButtonToolbar, Col } from 'react-bootstrap';

class CharacterListItem extends Component {
  render() {
    const { character } = this.props;
    return (
      <div className="CharacterListItem">
        <Col sm={4}>
          <Panel>
            <Panel.Heading>{character.name}</Panel.Heading>
            <Panel.Body>
              <p><b>Race: </b>{character.race}</p>
              <p><b>Class: </b>{character.class}</p>
              <Button><Link to={'/CharacterCreator/' + character.id}>Edit</Link></Button>
              <Button bsStyle="danger" onClick={() => this.props.deleteCharacter(character.id)}>Delete</Button>
            </Panel.Body>
          </Panel>
        </Col>
      </div>
    )
  }
}

export default CharacterListItem;
