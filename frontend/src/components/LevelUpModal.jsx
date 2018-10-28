import React, { Component } from 'react';
import axios from 'axios';

import { Modal, Button } from 'react-bootstrap';

import serverURL from '../objects/url.js';


class LevelUpModal extends React.Component {
    constructor(props, context){
        super(props, context);

        this.handleShowP1 = this.handleShowP1.bind(this);
        this.handleCloseP1 = this.handleCloseP1.bind(this);

        this.state = {
            showP1: false,
            showp2: false,
        }
    }

    componentWillMount() {
        const sever = axios.create({
            baseURL: serverURL,
        });
    }

    handleShowP1() {
        this.setState({ showP1: true});
    }

    handleCloseP1() {
        this.setState({showP1: false});
    }

    render(){
        return (
            <div>
                 <Button bsStyle="primary" bsSize="xsmall" onClick={this.handleShowP1}>
                    Level Up
                </Button>

                <Modal show={this.state.showP1} onHide={this.handleCloseP1}>
                    <Modal.Header closeButton>
                        <Modal.Title>Level Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p1>Please know that you will be unable to revert the characters level</p1>
                        <br />
                        <p1>were are on the levelup modal</p1>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleCloseP1}>Close</Button>
                    </Modal.Footer>
                </Modal>
        
                <Modal show={this.state.showP2}>
                    <Modal.Body>
                        <p1>Hey there from P2</p1>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default LevelUpModal;