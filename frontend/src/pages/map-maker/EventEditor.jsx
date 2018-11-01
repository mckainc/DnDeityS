import React, { Component } from 'react';

// components
import { Panel, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import './EventEditor.css';

class EventEditor extends Component {
  handleChange = e => {
    const { selectedX, selectedY } = this.props;

    let event = {};
    if (this.props.map.has(selectedX)) {
      event = this.props.map.get(selectedX).get(selectedY);
    }

    event[e.target.name] = e.target.value;

    this.props.editTile(selectedX, selectedY, 'event', event);
  }

  render() {
    const { selectedX, selectedY } = this.props;
    let event = {};

    if (this.props.map.has(selectedX) && this.props.map.get(selectedX).has(selectedY)) {
      event = this.props.map.get(selectedX).get(selectedY);
      if (typeof event.name === 'undefined') event.name = '';
      if (typeof event.description === 'undefined') event.description = '';
    }

    return (
      <div className="EventEditor">
        <Panel>
          <h4>Event Editor</h4>
          <Form >
            <FormGroup>
              <ControlLabel>Name</ControlLabel>
              <FormControl
                name="name"
                type="text"
                value={event.name}
                onChange={this.handleChange}
                placeholder="Enter Event Name"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                name="description"
                componentClass="textarea"
                value={event.description}
                onChange={this.handleChange}
                placeholder="Enter Event Description"
              />
            </FormGroup>
          </Form>
        </Panel>
      </div>
    )
  }
}

export default EventEditor;
