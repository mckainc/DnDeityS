import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class NewLoginForm extends React.Component {

    constructor(props, context) {
        super(props, context);
    
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeP = this.handleChangeP.bind(this);
    
        this.state = {
          value: '',
          password: ''
        };
      }
    
      getValidationState() {
        const length = this.state.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
      }
    
      handleChange(e) {
        this.setState({ value: e.target.value });
      }

      handleChangeP(e){
          this.setState({ password: e.target.password });
      }
    
      render() {
        return (
          <form>
            <FormGroup
              controlId="formBasicText"
              validationState={this.getValidationState()}
            >
              <FormControl
                type="text"
                value={this.state.value}
                placeholder="Enter text"
                onChange={this.handleChange}
              />

              <FormControl
                  type="text"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={this.handleChangeP}
              />
              <FormControl.Feedback />
            </FormGroup>
          </form>
        );
      }
}

export default NewLoginForm;