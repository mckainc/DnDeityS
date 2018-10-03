import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

import NewUserForm from "./NewUserForm"
import { Link } from 'react-router-dom'

class NewUser extends Component {

    onSubmit = fields => {
        console.log('Login Info Retrieved: ', fields);
    };

    render(){
        return (
            <div className="NewUser">
                <NewUserForm onSubmit={fields => this.onSubmit(fields)} />
            </div>
        );
    }
}

export default NewUser;