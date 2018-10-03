import React, { Component } from 'react';

// components
import EquipmentListItem from './EquipmentListItem';

import { Well, ListGroup } from 'react-bootstrap';

class EquipmentList extends Component {
  render() {
    return (
      <div className="EquipmentList">
        <Well>
          <b>List of Equipment:</b>
          <div className="scrollable-list">
            <ListGroup>
              {this.props.equipment.valueSeq().map(item => (
                <EquipmentListItem item={item}/>
              ))}
            </ListGroup>
            </div>
          </Well>
      </div>
    );
  }
}

export default EquipmentList;
