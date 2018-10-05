import React, { Component } from 'react';
import axios from 'axios';

import serverURL from '../../objects/url.js';

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
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  sendEmail = () => {
    const { username, email } = this.state;
    if(username === "" || email === "") {
      this.setState({ displayError: true });
      return;
    }

    // Send email
    const server = axios.create({
      baseURL: serverURL,
    });

    server.get('/user/' + username)
      .then(response => {
        const userId = response.data[0];
        server.post('/user/' + userId +'/resetpassword')
          .then(response => {

          })
          .catch(error => {
            // error sending email
          })
      })
      .catch(error => {
        // user doesn't exist
      });
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