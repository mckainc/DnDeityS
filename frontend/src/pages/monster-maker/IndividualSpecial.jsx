import React, { Component } from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel, } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

// components
import { Panel, Button, Col } from 'react-bootstrap';

class IndividualSpecial extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
    }
  }

  handleClick(){
    this.setState({ redirect: true });
  }
  
  render() {
    const { character } = this.props;
 
    return (
      <div className="CharacterListItem">
        <Col sm={4}>
          <Panel>
            <Panel.Heading>{character.name}</Panel.Heading>
            <Panel.Body>
              <p><b>Race: </b>{character.race}</p>
              <p><b>Class: </b>{character.class}</p>
              <Button onClick = {() => this.handleClick(character)}>Edit</Button>
              <Button bsStyle="danger" onClick={() => this.props.deleteCharacter(character.id)}>Delete</Button>
            </Panel.Body>
          </Panel>
        </Col>
      </div>
    )
  }
}

export default IndividualSpecial;