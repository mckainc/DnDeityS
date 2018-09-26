import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Grid, Row, Col, Image, Button  } from 'react-bootstrap';
import './login.css'
import Form from '/loginForm';

export default class login extends Component {
    render() {
        return (
            //header of page
            <Grid>
                <Jumbotron>
                    <h1>DnDeity</h1>
                    <p>Please enter you login info</p>
                </Jumbotron>

                <Form />

                <Link to="/newUser">
                    <button> bsStyle="primary" </button>
                </Link>
                <Link to="/home">
                    <button> bsStyle="primary" </button>
                </Link>
            </Grid>
            
            
            
        )
    }
}