import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Panel } from 'react-bootstrap';

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

          <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="username" bsSize="large">
                <ControlLabel>User Name</ControlLabel>
                <FormControl
                  autoFocus
                  type="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </FormGroup>

              
              <FormGroup controlId="password" bsSize="large">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  autoFocus
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </FormGroup>

              <FormGroup controlId="passwordAgain" bsSize="large">
                <ControlLabel>Confirm Pass</ControlLabel>
                <FormControl
                  autoFocus
                  type="password"
                  value={this.state.passwordAgain}
                  onChange={this.handleChange}
                />
              </FormGroup>

              <FormGroup controlId="email" bsSize="large">
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  autoFocus
                  type="text"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormGroup>

              <Button
                block
                bsSize="large"
                disabled={!this.validationForm()}
                type="submit"
              >
                Submit
              </Button>

          </form>
        );
      }
}

export default NewLoginForm;