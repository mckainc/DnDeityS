import React, { Component } from 'react';

// components
import EquipmentListItem from './EquipmentListItem';

import { Well, ListGroup, FormControl } from 'react-bootstrap';

class EquipmentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: "",
    }
  }

  search = e => {
    this.setState({ searchInput: e.target.value });
  }

  render() {
    const { searchInput } = this.state;
    const filteredList = this.props.equipment.filter(item => {
      return searchInput.toLowerCase() === item.name.substring(0, searchInput.length).toLowerCase();
    });
    return (
      <div className="EquipmentList">
        <Well>
          <b>List of Equipment:</b>
          <FormControl
            name="Equipment Search"
            type="text"
            placeholder="Search for Equipment"
            onChange={this.search}
          />
          <div className="scrollable-list">
            <ListGroup>
              {filteredList.valueSeq().map(item => (
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
