import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

// components
import { ListGroupItem } from 'react-bootstrap';

// Type for drag and drop
const EquipmentType = {
  EQUIPMENT: 'equipment',
};

const itemSource = {
  beginDrag(props) {
    return { item: props.item };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class EquipmentListItem extends Component {
  render() {
    const { connectDragSource } = this.props;
    return connectDragSource(
      <div className="EquipmentList">
        <ListGroupItem>
          {this.props.item.name}
        </ListGroupItem>
      </div>
    );
  }
}

export default DragSource(EquipmentType.EQUIPMENT, itemSource, collect)(EquipmentListItem);