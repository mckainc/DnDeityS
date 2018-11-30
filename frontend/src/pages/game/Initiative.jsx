import React, { Component } from 'react';

// components
import Draggable from 'react-draggable';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

import './Initiative.css';

class Initiative extends Component {
  render() {
    // console.log(this.props.initiativeList)
    return (
      <Draggable>
        <Panel className="Initiative">
          <Panel.Heading>Initiative</Panel.Heading>
          <Panel.Body>
            <ListGroup>
              {this.props.initiativeList
                .valueSeq().map(character => (
                  <ListGroupItem>
                    {character.initiative}: {character.character}, {character.race} {character.class}
                  </ListGroupItem>
                ))
              }
            </ListGroup>
          </Panel.Body>
        </Panel>
      </Draggable>
    )
  }
}

export default Initiative;