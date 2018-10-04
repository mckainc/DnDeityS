import React, { Component } from 'react';

// components
import { Panel, Button, ButtonToolbar, Col } from 'react-bootstrap';

class CharacterListItem extends Component {
  render() {
    const { character } = this.props;
    return (
      <div className="CharacterListItem">
        <Col sm={2}>
          <Panel>
            <Panel.Heading>{character.name}</Panel.Heading>
            <Panel.Body>
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
