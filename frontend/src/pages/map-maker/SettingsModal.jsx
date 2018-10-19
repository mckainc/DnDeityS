import React, { Component } from 'react';

// components
import { Button, Modal, FormGroup, Form, FormControl, ControlLabel, Col } from 'react-bootstrap';

class SettingsModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'Untitled',
      x: props.x,
      y: props.y,
    }
  }

  handleChange = e => {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  render() {
    const { x, y } = this.state;
    return (
      <Modal show={this.props.showSettings} onHide={() => this.props.handleSettingsClose(x, y)}>
        <Modal.Header closeButton>Settings</Modal.Header>
        <Modal.Body>
          <Form horizontal>
            <FormGroup>
              <Col sm={2}>
                <ControlLabel>Name</ControlLabel>
              </Col>
              <Col sm={10}>
                <FormControl
                  name="name"
                  type="text"
                  placeholder="Enter Map Name"
                  onChange={e => this.handleChange(e)}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm={2}>
                <ControlLabel>Width</ControlLabel>
              </Col>
              <Col sm={10}>
                <FormControl
                  name="x"
                  type="number"
                  value={x}
                  onChange={e => this.handleChange(e)}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm={2}>
                <ControlLabel>Height</ControlLabel>
              </Col>
              <Col sm={10}>
                <FormControl
                  name="y"
                  type="number"
                  value={y}
                  onChange={e => this.handleChange(e)}
                />
              </Col>
            </FormGroup>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

export default SettingsModal;
