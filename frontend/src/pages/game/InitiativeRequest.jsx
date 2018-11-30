import React, { Component } from 'react';

// components
import Draggable from 'react-draggable';
import { Button, ControlLabel, Form, FormControl, Col, FormGroup, Panel } from 'react-bootstrap';

import './InitiativeRequest.css';

class InitiativeRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initiative: 1,
    }
  }

  handleChange = (e) => {
    this.setState({ initiative: e.target.value });
  }

  handleClick = () => {
    this.props.sendInitiativeResponse(this.state.initiative);
  }

  render() {
    return (
      <Draggable cancel='.drag-cancel'>
        <Panel className="InitiativeRequest">
          <Panel.Body>
            <Form horizontal>
              <FormGroup>
                <Col sm={2}>
                  <ControlLabel>Initiative:</ControlLabel>
                </Col>
                <Col sm={8}>
                  <FormControl
                    className="drag-cancel"
                    name="initiative"
                    type="number"
                    value={this.state.initiative}
                    onChange={this.handleChange}
                  />
                </Col>
                <Col sm={2}>
                  <Button onClick={this.handleClick}>Send</Button>
                </Col>
              </FormGroup>
            </Form>
          </Panel.Body>
        </Panel>
      </Draggable>
    )
  }
}

export default InitiativeRequest;