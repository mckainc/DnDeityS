import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Form } from 'react-bootstrap';

class NewLoginForm extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          username: "",
          password: "",
          passwordAgain: "",
          email: ""
        };
      }

    
      validationForm(){
          return this.state.username.length > 0 
          && this.state.password.length > 0
          && this.state.passwordAgain.length > 0
          && this.state.email.length > 0
          && !this.state.password.localeCompare(this.state.passwordAgain);
      }

      handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }

      handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state);
      }
    
      render() {
        return (

          <Form onSubmit={this.handleSubmit}>
              <FormGroup controlId="username">
                <ControlLabel>User Name</ControlLabel>
                <FormControl
                  autoFocus
                  type="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  placeholder="Enter Username"
                />
              </FormGroup>

              
              <FormGroup controlId="password">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  autoFocus
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="Enter Password"
                />
              </FormGroup>

              <FormGroup controlId="passwordAgain">
                <ControlLabel>Confirm Pass</ControlLabel>
                <FormControl
                  autoFocus
                  type="password"
                  value={this.state.passwordAgain}
                  onChange={this.handleChange}
                  placeholder="Re-Enter Password"
                />
              </FormGroup>

              <FormGroup controlId="email">
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="Enter Email"
                />
              </FormGroup>

              <Button
                disabled={!this.validationForm()}
                type="submit"
              >
                Submit
              </Button>

          </Form>
        );
      }
}

export default NewLoginForm;