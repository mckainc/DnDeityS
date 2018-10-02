import React, { Component } from 'react';

import { Panel, FormGroup, Form, FormControl, ControlLabel, Col, Button } from 'react-bootstrap';

class ChangePassword extends Component {
  render() {
    return (
      <div className="ChangePassword">
        <Panel>
          <Panel.Body>
            <h1>DnDeity</h1>
            <h3>Send Email to Change Password</h3>
            <Form horizontal>
              <FormGroup>
                <Col sm={2}>
                  <ControlLabel>Username</ControlLabel>
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    placeholder="Enter Username"
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={2}>
                  <ControlLabel>Email</ControlLabel>
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="email"
                    placeholder="Enter Email"
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Button type="submit">Send Email</Button>
              </FormGroup>
            </Form>
          </Panel.Body>
        </Panel>
      </div>
    )
  }
}

export default ChangePassword;