import React, { Component } from 'react';
import axios from 'axios';

// types
import serverURL from '../../objects/url.js';

// components
import { Modal, Form, FormControl, Col, ControlLabel, Button, FormGroup } from 'react-bootstrap';

class JoinGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
    }
  }

  handleChange = e => {
    this.setState({ code: e.target.value });
  }

  join = () => {
    const server = axios.create({
      baseURL: serverURL,
    });

    const json = {
      channel: this.state.code,
      event: 'join-lobby',
      message: {
        msg: 'user joined'
      }
    }

    server.post('/pushmessage', JSON.stringify(json));

    // TODO bind channel to events
  }

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
                onChange={this.handleChange}
              />
            </Col>
            <Col sm={2}>
              <Button onClick={this.join}>Join</Button>
            </Col>
          </FormGroup>
        </Form>
      </Modal.Body>
      </Modal>
    )
  }
}

export default JoinGame;
