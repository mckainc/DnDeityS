import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import axios from 'axios';



class NewLoginForm extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          username: "",
          password: ""
        };
      }
    
      validationForm(){
          return this.state.username.length > 0 && this.state.password.length > 0;
      }

      handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }

      handleSubmit = event => {
        event.preventDefault();
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

              <Button
                block
                bsSize="large"
                disabled={!this.validationForm()}
                type="submit"
              >
                Login
              </Button>

            
          </form>
          
        );
      }
}

export default NewLoginForm;