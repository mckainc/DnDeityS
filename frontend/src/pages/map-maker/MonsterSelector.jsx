import React, { Component } from 'react';

// components
import MonsterDetails from './MonsterDetails';

import { ControlLabel, FormControl, ListGroup, ListGroupItem, Well, Panel } from 'react-bootstrap';

import './MonsterSelector.css';

class MonsterSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      monster: undefined,
      searchInput: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type) {
      const monster = this.props.monsters.get(nextProps.type);
      this.setState({ monster });
    }
  }

  deleteMonster = () => {
    this.props.deleteMonster();
    this.setState({ monster: undefined });
  }

  selectMonster = monster => {
    this.props.selectMonster(monster.name);
    this.setState({ monster });
  }

  search = e => {
    this.setState({ searchInput: e.target.value });
  }

  render() {
    const { monster, searchInput } = this.state;
    const filteredList = this.props.monsters.filter(monster => {
      return searchInput.toLowerCase() === monster.name.substring(0, searchInput.length).toLowerCase();
    }).sort((a, b) => a.name.localeCompare(b.name));

    if (typeof monster !== 'undefined') {
      return (
        <div className="MonsterSelector">
          <ControlLabel>Monster</ControlLabel>
          <Well>
            <ListGroupItem>
              {monster.name}
              <a onClick={this.deleteMonster} href="#!"><i className="fas fa-times"></i></a>
            </ListGroupItem>
            <br />
            <MonsterDetails monster={monster}/>
          </Well>
        </div>
      );
    }
  
    return (
      <div className="MonsterSelector">
        <ControlLabel>Monster</ControlLabel>
        <Well>
          <FormControl
            name="Monster Search"
            type="text"
            placeholder="Search Monsters"
            onChange={this.search}
          />
          <div className="scrollable-list">
            <ListGroup>
              {filteredList.valueSeq().map(monster => (
                <ListGroupItem onClick={() => this.selectMonster(monster)}>{monster.name}</ListGroupItem>
              ))}
            </ListGroup>
          </div>
        </Well>
      </div>
    )
  }
}

export default MonsterSelector;