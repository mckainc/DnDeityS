import React, { Component } from 'react';

import { Panel, Button } from 'react-bootstrap';

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
                <div className="bg"/>
                <Panel>
                <h1>Welcome to DnDeity</h1>
                <h2>Please enter your login</h2>
                <NewLoginForm />

                <div id="wrapper">
                    <Link to="/NewUser">
                        Register
                     </Link>
<br />
                    <Link to="/ForgottenPassword">
                         Forgot Password?
                    </Link>
                </div>
                </Panel>
            </div>
            
        );
    }
}

export default Login