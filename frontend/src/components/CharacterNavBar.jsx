import React, { Component } from 'react';

// components
import { Nav, NavItem } from 'react-bootstrap';

const sections = ['Race', 'Class', 'Ability Scores', 'Equipment'];

class CharacterNavBar extends Component {
  render() {
    return (
      <div className="CharacterNavBar">
        <Nav bsStyle="pills" stacked>
          {sections.map(section => (
            <NavItem eventKey={section}>{section}</NavItem>
          ))}
        </Nav>
      </div>
    )
  }
}

export default CharacterNavBar;