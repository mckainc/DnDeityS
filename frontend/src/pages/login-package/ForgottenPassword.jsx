import React, { Component } from 'react';

import { Panel, FormGroup, Form, FormControl, ControlLabel, Col, Button } from 'react-bootstrap';

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
        <Panel>
          <Panel.Body>
            <h1>DnDeity</h1>
            <h3>Change Password</h3>
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
                <p>Please specify a username and email</p>
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