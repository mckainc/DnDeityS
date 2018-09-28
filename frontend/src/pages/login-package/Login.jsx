import React, { Component } from 'react';

import { FormControl } from 'react-bootstrap';

import LoginForm from "./LoginForm"

class Login extends Component {
    render(){
        return (
            <div className="Login">
                <h1>Welcome to DnDeity</h1>
                <h2>Please enter your login</h2>
                <LoginForm />
            </div>
        );
    }
}

export default Login