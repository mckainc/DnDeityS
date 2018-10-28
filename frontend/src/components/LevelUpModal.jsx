import React, { Component } from 'react';
import axios from 'axios';

import { Modal } from 'react-bootstrap';

import serverURL from '../../objects/url.js';


class LevelUpModal extends React.Component {
    constructor(props, context){
        super(props, context);

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
        }
    }

    componentWillMount() {
        const sever = axios.create({
            baseURL: serverURL,
        });
    }

    handleOpen() {
        this.setState({ show: true});
    }

    handleClose() {
        this.setState({show: false});
    }

    render(){
        return (
            <div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.title>Level Up</Modal.title>
                    </Modal.Header>
                </Modal>
            </div>
        )
    }
}