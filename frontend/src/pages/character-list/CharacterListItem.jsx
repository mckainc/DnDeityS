import React, { Component } from 'react';

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
              <Button>Edit</Button>
              <Button bsStyle="danger">Delete</Button>
            </Panel.Body>
          </Panel>
        </Col>
      </div>
    )
  }
}

export default CharacterListItem;
