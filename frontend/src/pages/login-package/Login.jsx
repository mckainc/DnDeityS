import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

import LoginForm from "./LoginForm"
import { Link } from 'react-router-dom'

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
                <Link to="/Home">
                    <Button onClick>testing</Button>
                </Link>

                <Link to="/NewUser">
                    <Button onClick>New User</Button>
                </Link>

                <Link to="/ChangePassword">
                    <Button onClick>Change Password</Button>
                </Link>
            </div>
            
        );
    }
}

export default Login