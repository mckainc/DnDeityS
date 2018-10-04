import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

// components
import { ListGroupItem } from 'react-bootstrap';

// Type for drag and drop
const SpellType = {
  SPELL: 'spell',
};

const itemSource = {
  beginDrag(props) {
    return { spell: props.spell };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class SpellListItem extends Component {
  render() {
    const { connectDragSource } = this.props;
    return connectDragSource(
      <div className="SpellListItem">
        <ListGroupItem>
          {this.props.spell.name}
        </ListGroupItem>
      </div>
    );
  }
}

export default DragSource(SpellType.SPELL, itemSource, collect)(SpellListItem);