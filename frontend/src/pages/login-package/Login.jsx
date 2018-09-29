import React, { Component } from 'react';

import { FormControl, Button } from 'react-bootstrap';

import LoginForm from "./LoginForm"
import { BrowserRouter, Link } from 'react-router-dom'
import Route from 'react-router-dom/Route'

class Login extends Component {
    //fields are a JSON data type
    onSubmit = fields => {
        console.log('Login Info Retrieved: ', fields);
    };

    render(){
        return (
            <div className="Login">
                <h1>Welcome to DnDeity</h1>
                <h2>Please enter your login</h2>
                <LoginForm onSubmit={fields => this.onSubmit(fields)} />
                <Button onClick>New</Button>
            </div>
            
        );
    }
}

export default Login