import React, { Component } from 'react';

// components
import { Nav, NavItem } from 'react-bootstrap';

class CharacterNavBar extends Component {
  scrollToSection = (index) => {
    this.props.refs[index].current.scrollIntoView({behavior: 'smooth'});
  }

  render() {
    return (
      <div className="CharacterNavBar" style={{position: "fixed"}}>
        <Nav bsStyle="pills" stacked>
          {this.props.sections.map((section, index) => (
            <NavItem eventKey={section} onClick={() => this.scrollToSection(index)}>{section}</NavItem>
          ))}
        </Nav>
      </div>
    )
  }
}

export default CharacterNavBar;