import React, { Component } from 'react';

// components
import Draggable from 'react-draggable';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

import './Initiative.css';

class Initiative extends Component {
  render() {
    const sortedList = this.props.initiativeList.sort((a, b) => a.initiative < b.initiative)
    return (
      <Draggable>
        <Panel className="Initiative">
          <Panel.Heading>
            Initiative
            <a onClick={this.props.hideModal} href="#!"><i className="fas fa-times"></i></a>
          </Panel.Heading>
          <Panel.Body>
            <ListGroup>
              {sortedList
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