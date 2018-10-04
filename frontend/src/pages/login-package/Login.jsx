import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

import NewLoginForm from "./NewLoginForm"
import { Link } from 'react-router-dom'

import "./NewLoginForm.css"


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
                <NewLoginForm />

                <div id="wrapper">
                    <Link to="/NewUser">
                        <Button onClick>New User</Button>
                     </Link>

                    <Link to="/ForgottenPassword">
                        <Button onClick>Forgot Password?</Button>
                    </Link>
                </div>

            </div>
            
        );
    }
}

export default Login