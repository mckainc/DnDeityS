import React, { Component } from 'react';

import { Panel, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class MonsterEditor extends Component {
  handleChange = e => {
    const { selectedX, selectedY } = this.props;

    let monster = {};
    if (this.props.map.has(selectedX)) {
      monster = this.props.map.get(selectedX).get(selectedY).monster;
      if (typeof monster === 'undefined') monster = {};
    }

    monster[e.target.name] = e.target.value;

    this.props.editTile(selectedX, selectedY, 'monster', monster);
  }

  selectMonster = monster => {
    const event = {};
    event.target = {};
    event.target.name = 'type';
    event.target.value = monster;
    this.handleChange(event);
  }

  deleteMonster = () => {
    const event = {};
    event.target = {};
    event.target.name = 'type';
    event.target.value = '';
    this.handleChange(event);
  }

  render() {
    const { selectedX, selectedY } = this.props;
    let monster = {};

    if (this.props.map.has(selectedX) && this.props.map.get(selectedX).has(selectedY)) {
      monster = this.props.map.get(selectedX).get(selectedY).monster;
      if (typeof monster === 'undefined') monster = {};
      if (typeof monster.name === 'undefined') monster.name = '';
      if (typeof monster.description === 'undefined') monster.description = '';
      if (typeof monster.type === 'undefined') monster.type = '';
    }

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
                value={monster.name}
                onChange={this.handleChange}
                placeholder="Enter Monster Name"
              />
            </FormGroup>
            <MonsterSelector
              monsters={this.props.monsters}
              type={monster.type}
              selectMonster={this.selectMonster}
              deleteMonster={this.deleteMonster}
            />
            <br />
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                name="description"
                value={monster.description}
                onChange={this.handleChange}
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
