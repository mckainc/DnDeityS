import React, { Component } from 'react';
import axios from 'axios';

import serverURL from '../../objects/url';

import NewUserForm from "./NewUserForm.jsx"
import { Redirect } from 'react-router-dom'


import { Panel } from 'react-bootstrap';
import "./NewUserForm.css"

class NewUser extends Component {
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
        requestJSON.email = fields.email

        server.post('/user', requestJSON)
            .then(response => {
                // set user id in local storage
                console.log(response.data[0])
                localStorage.setItem('user_id', response.data[0]);

                // redirect
                this.setState({ redirect: true });
            })
            .catch(error => {
                // some error happened
            })
    };

    render(){
        if (this.state.redirect) {
            return <Redirect to="/Home" />
        }
    
        return (
            <div className="NewUser">
                <div className="bg"/>
                <Panel>
                <h1 className="logo">DnDeity</h1>
                <h3>New Account</h3>
                <NewUserForm onSubmit={this.onSubmit} />
                </Panel>
            </div>
        );
    }
}

export default NewUser;