import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class NewLoginForm extends React.Component {

    constructor(props, context){
        super(props, context);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: ''
        };

    }

    getValidationState(){
        const length = this.state.value.lenght;
        if(length == 0) 
            return 'error';
        else
            return 'success';
        
    }

    handleChange(e){
        this.setState({ value: e.target.value });
    }

    render(){
        return (
            <form>
                <FormGroup
                    controlId="loginText"
                    validationState={this.getValidationState()}
                >
                    <ControlLabel>Working Example with validation</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.value}
                        placeholder="User Name"
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                    <HelpBlock>Validation is based on string length</HelpBlock>
                </FormGroup>
            </form>
        );
    }
}

render(<NewLoginForm />)