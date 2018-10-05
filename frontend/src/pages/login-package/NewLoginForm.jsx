import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, Form } from 'react-bootstrap';
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
                  placeholder="Enter username"
                />
              </FormGroup>

              
              <FormGroup controlId="password">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  autoFocus
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="Enter password"
                />
              </FormGroup>

              <Button
                disabled={!this.validationForm()}
                type="submit"
              >
                Login
              </Button>

            
          </Form>
          
        );
      }
}

export default NewLoginForm;