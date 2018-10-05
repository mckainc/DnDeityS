import React, { Component } from 'react';
import axios from 'axios';

import serverURL from '../../objects/url';

import { Panel, Button } from 'react-bootstrap';

import NewLoginForm from "./NewLoginForm"
import { Link, Redirect } from 'react-router-dom'

import "./NewLoginForm.css"


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
        }
    }
    //fields are a JSON data type
    onSubmit = fields => {
        const server = axios.create({
            baseURL: serverURL,
        });

        const requestJSON = {};
        requestJSON.username = fields.username;
        requestJSON.password = fields.password;

        server.post('/authenticate', requestJSON)
            .then(response => {
                // set user id in local storage
                localStorage.setItem('user_id', response.data.UserId);

                // redirect
                this.setState({ redirect: true });
            })
            .catch(error => {
                // invalid credentials
            })
    };

    render(){
        if (this.state.redirect) {
            return <Redirect to="/Home" />
        }
        return (
            <div className="Login">
                <div className="bg"/>
                <Panel>
                <h1>Welcome to DnDeity</h1>
                <h2>Please enter your login</h2>
                <NewLoginForm onSubmit={this.onSubmit}/>

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