import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

import NewUserForm from "./NewUserForm.jsx"
import { Link } from 'react-router-dom'

import "./NewUserForm.css"

class NewUser extends Component {

    onSubmit = fields => {
        console.log('Login Info Retrieved: ', fields);
    };

    render(){
        return (
            <div className="NewUser">
                <NewUserForm />
            </div>
        );
    }
}

export default NewUser;