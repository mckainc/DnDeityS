import React, { Component } from 'react';
import axios from 'axios';

import { Modal, Button, ModalHeader } from 'react-bootstrap';

import serverURL from '../objects/url.js';

const parts = ['Proficency', 'HitPoints', 'AbilityScore', 'Feats', 'Description' ];


class LevelUpModal extends React.Component {
    constructor(props, context){
        super(props, context);

        this.handleShowP1 = this.handleShowP1.bind(this);
        this.handleCloseP1 = this.handleCloseP1.bind(this);
        this.handleShowP2 = this.handleShowP2.bind(this);
        this.handleCloseP2 = this.handleCloseP2.bind(this);

        const characterId = props.loaded ? props.characterId : 'none';

        this.state = {
            showP1: false,
            showp2: false,
            level: "",
            class: "",
            character: { description: {} },
            test: "please show up",
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
        this.setState({ showP1: false});
    }

    handleShowP2() {
        this.setState({ showP2: true});
        this.setState({ showP1: false})
    }

    handleCloseP2() {
        this.setState({ showP2: false});
    }

    changeCharacter = (property, value, isDescription) => {
        const { character } = this.state;
        if (isDescription === true) {
          character['description'][property] = value;
        } else {
          character[property] = value;
        }
      }

    saveCharacter = () => {
        const { character } = this.state;
        const server = axios.create({
          baseURL: serverURL,
        });
    
        const userId = localStorage.getItem('user_id');
        character['user_id'] = userId;
    
        if (this.state.characterId !== null) {
          // Update character
          server.patch('/character/' + this.state.characterId, JSON.stringify(character));
          return;
        }
    
        // Create character
        server.post('/character', JSON.stringify(character))
          .then(response => {
            const characterId = response.data.CharacterId;
            this.setState({ characterId });
          })
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
                        <Button onClick={this.handleShowP2}>Continue</Button>
                        <Button onClick={this.handleCloseP1}>Close</Button>
                    </Modal.Footer>
                </Modal>
        
                <Modal show={this.state.showP2} onHide={this.handleCloseP2}>
                    <Modal.Header>
                        <Modal.Title>Level Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p1>Hey there from P2</p1>
                        <p1><div> {this.state.characterId}!</div></p1>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleCloseP2}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default LevelUpModal;