import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

// components
import { Well, ListGroup, ListGroupItem } from 'react-bootstrap';

import './Inventory.css';

// Type for drag and drop
const EquipmentType = {
  EQUIPMENT: 'equipment',
};

// Methods for drag and drop
const InventoryTarget = {
  drop(props, monitor) {
    const item = monitor.getItem().item;
    props.addItemToInventory(item);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class Inventory extends Component {
  render() {
    const { connectDropTarget, inventory } = this.props;
    return connectDropTarget(
      <div>
        <Well>
          <b>Character's Inventory:</b>
          <div className="scrollable-list">
            <ListGroup>
              {inventory.valueSeq().map(item => (
                <ListGroupItem>
                  {item.name}
                  <div className="actions">
                    <a onClick={() => this.props.changeQuantity(item, -1)} href="#!"><i className="fas fa-minus-square"></i></a>
                    <b className="quantity">x{typeof item.quantity === 'undefined' ? 1 : item.quantity}</b>
                    <a onClick={() => this.props.changeQuantity(item, 1)} href="#!"><i className="fas fa-plus-square"></i></a>
                    <a onClick={() => this.props.removeItem(item)} href="#!"><i className="fas fa-times"></i></a>
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

export default DropTarget(EquipmentType.EQUIPMENT, InventoryTarget, collect)(Inventory);