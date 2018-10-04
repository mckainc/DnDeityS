import React, { Component } from 'react';

// components
import SpellListItem from './SpellListItem';

import { Well, ListGroup, FormControl } from 'react-bootstrap';

class SpellList extends Component {
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
    const filteredList = this.props.spells.filter(spell => {
      return searchInput.toLowerCase() === spell.name.substring(0, searchInput.length).toLowerCase();
    });
    return (
      <div className="SpellList">
        <Well>
          <b>List of Spells:</b>
          <FormControl
            name="Spell Search"
            type="text"
            placeholder="Search for Spells"
            onChange={this.search}
          />
          <div className="scrollable-list">
            <ListGroup>
              {filteredList.valueSeq().map(spell => (
                <SpellListItem spell={spell}/>
              ))}
            </ListGroup>
            </div>
          </Well>
      </div>
    );
  }
}

export default SpellList;
