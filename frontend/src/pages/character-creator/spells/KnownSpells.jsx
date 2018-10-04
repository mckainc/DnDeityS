import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

// components
import { Well, ListGroup, ListGroupItem } from 'react-bootstrap';

// Type for drag and drop
const SpellType = {
  SPELL: 'spell',
};

// Methods for drag and drop
const SpellTarget = {
  drop(props, monitor) {
    const spell = monitor.getItem().spell;
    props.addSpell(spell);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class KnownSpells extends Component {
  render() {
    const { connectDropTarget, knownSpells } = this.props;
    return connectDropTarget(
      <div>
        <Well>
          <b>Character's Spells:</b>
          <p>Drag items from the spell list to add them to your character</p>
          <div className="scrollable-list">
            <ListGroup>
              {knownSpells.valueSeq().map(spell => (
                <ListGroupItem>
                  {spell.name}
                  <div className="actions">
                    <a onClick={() => this.props.removeSpell(spell)} href="#!"><i className="fas fa-times"></i></a>
                  </div>
                </ListGroupItem>
                ))}
            </ListGroup>
          </div>
        </Well>
      </div>
    );
  }
}

export default DropTarget(SpellType.SPELL, SpellTarget, collect)(KnownSpells);