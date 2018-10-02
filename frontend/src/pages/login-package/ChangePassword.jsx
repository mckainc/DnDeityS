import React, { Component } from 'react';

import { Panel, FormGroup, Form, FormControl, ControlLabel, Col, Button } from 'react-bootstrap';

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      confirmPassword: "",
      displayError: "",
    }
  }

  handleChange = e => {
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  changePassword = () => {
    const { password, confirmPassword } = this.state;
    if (password === "" || confirmPassword === "") {
      this.setState({ displayError: "empty" });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({ displayError: "match" });
      return;
    }

    // TODO Change password
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
                  <ControlLabel>New Password</ControlLabel>
                </Col>
                <Col sm={10}>
                  <FormControl
                    name="password"
                    type="password"
                    placeholder="Enter New Password"
                    onChange={e => this.handleChange(e)}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={2}>
                  <ControlLabel>Confirm Password</ControlLabel>
                </Col>
                <Col sm={10}>
                  <FormControl
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm New Password"
                    onChange={e => this.handleChange(e)}
                  />
                </Col>
              </FormGroup>
              {this.state.displayError === "empty" && 
                <p>Please fill out all fields.</p>
              }
              {this.state.displayError === "match" && 
                <p>Passwords do not match.</p>
              }
              <FormGroup>
                <Button onClick={this.changePassword}>Change Password</Button>
              </FormGroup>
            </Form>
          </Panel.Body>
        </Panel>
      </div>
    )
  }
}

export default ChangePassword;