import React, { Component } from 'react';
import axios from 'axios';

import { Modal, Button } from 'react-bootstrap';

import serverURL from '../objects/url.js';

import './LUC.css'

class LevelUpConfermation extends React.Component {
    constructor(props, context){
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false
        };
    }

    componentWillMount() {
        const sever = axios.create({
            baseURL: serverURL,
        });
    }

    handleShow() {
        this.setState({ show: true});
    }

    handleClose() {
        this.setState({ show: false });
    }

    render() {
        return (
            <div className="LUC">
                <Button bsStyle="primary" bsSize="xsmall" onClick={this.handleShow}>
                    Level Up asd asdasd
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Level Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p1>Are You Sure About that</p1>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default LevelUpConfermation;
//render(<LevelUpConfermation />);