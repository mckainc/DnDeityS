import React, { Component } from 'react';

// components
import { Modal, Form, FormControl, Col, ControlLabel, Button, FormGroup } from 'react-bootstrap';

class JoinGame extends Component {
  render() {
    return (
      <Modal className="JoinGame" show={this.props.showJoinModal} onHide={this.props.onClose}>
      <Modal.Header closeButton>Join a Game</Modal.Header>
      <Modal.Body>
        <Form horizontal>
          <FormGroup>
            <Col sm={2}>
              <ControlLabel>Code:</ControlLabel>
            </Col>
            <Col sm={8}>
              <FormControl
                name="code"
                type="text"
                placeholder="Enter Lobby Code"
              />
            </Col>
            <Col sm={2}>
              <Button>Join</Button>
            </Col>
          </FormGroup>
        </Form>
      </Modal.Body>
      </Modal>
    )
  }
}

export default JoinGame;
