import React, { Component } from 'react';

// components
import MonsterSelector from './MonsterSelector';

import { Panel, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import './MonsterEditor.css';

class MonsterEditor extends Component {
  render() {
    return (
      <div className="MonsterEditor">
        <Panel>
          <h4>Monster Editor</h4>
          <Form >
            <FormGroup>
              <ControlLabel>Name</ControlLabel>
              <FormControl
                name="name"
                type="text"
                placeholder="Enter Monster Name"
              />
            </FormGroup>
            <MonsterSelector monsters={this.props.monsters} />
            <br />
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                name="name"
                componentClass="textarea"
                placeholder="Enter Monster Description"
              />
            </FormGroup>
          </Form>
        </Panel>
      </div>
    )
  }
}

export default MonsterEditor;
