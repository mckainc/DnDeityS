import React, { Component } from 'react';

// components
import { Panel, FormGroup, Form, FormControl, ControlLabel, Col, Button } from 'react-bootstrap';

import './ForgottenPassword.css';

class ForgottenPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      displayError: false,
    }
  }

  handleChange = e => {
    console.log(e.target.name, e.target.value)
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  sendEmail = () => {
    const { username, email } = this.state;
    if(username === "" || email === "") {
      console.log('error')
      this.setState({ displayError: true });
      return;
    }

    // TODO Send email
  }

  render() {
    return (
      <div className="ForgottenPassword">
        <div className="bg" />
        <Panel>
          <Panel.Body>
            <h1 className="logo">DnDeity</h1>
            <h3>Forgotten Password</h3>
            <p>Enter your username and email to receive an email about changing your password.</p>
            <Form horizontal>
              <FormGroup>
                <Col sm={2}>
                  <ControlLabel>Username</ControlLabel>
                </Col>
                <Col sm={10}>
                  <FormControl
                    name="username"
                    type="text"
                    placeholder="Enter Username"
                    onChange={e => this.handleChange(e)}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={2}>
                  <ControlLabel>Email</ControlLabel>
                </Col>
                <Col sm={10}>
                  <FormControl
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    onChange={e => this.handleChange(e)}
                  />
                </Col>
              </FormGroup>
              {this.state.displayError && 
                <p className="error">Please specify a username and email</p>
              }
              <FormGroup>
                <Button onClick={this.sendEmail}>Send Email</Button>
              </FormGroup>
            </Form>
          </Panel.Body>
        </Panel>
      </div>
    )
  }
}

export default ForgottenPassword;