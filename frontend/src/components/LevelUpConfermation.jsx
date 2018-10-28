import React, { Component } from 'react';
import axios from 'axios';

import { Modal, Button } from 'react-bootstrap';

import serverURL from '../objects/url.js';
import LevelUpModal from '../components/LevelUpModal';

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

    handleLevel() {
        this.handleClose();
        <LevelUpModal/>
    }

    render() {
        return (
            <div className="LUC">
                <Button bsStyle="primary" bsSize="xsmall" onClick={this.handleShow}>
                    Level Up
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Level Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p1>Please know that you will be unable to revert the characters level</p1>
                    </Modal.Body>
                    <Modal.Footer>
                        <LevelUpModal/>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default LevelUpConfermation;
//render(<LevelUpConfermation />);