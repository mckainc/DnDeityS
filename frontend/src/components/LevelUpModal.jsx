import React, { Component } from 'react';
import axios from 'axios';

//types
import { Map } from 'immutable';
import RaceType from '../objects/RaceType'
import serverURL from '../objects/url.js';

import { Modal, Button,  } from 'react-bootstrap';



const parts = ['Proficency', 'HitPoints', 'AbilityScore', 'Feats', 'Description' ];


class LevelUpModal extends React.Component {
    constructor(props, context){
        super(props, context);

        this.handleShowP1 = this.handleShowP1.bind(this);
        this.handleCloseP1 = this.handleCloseP1.bind(this);
        this.handleShowP2 = this.handleShowP2.bind(this);
        this.handleCloseP2 = this.handleCloseP2.bind(this);

        //characters user id, used for saving changes
        //refering to character passed by props, not local variable

        let points = props.ability_scores;
        let charClass = props.class;
        let exp = props.exp;
        let charId = props.charId;

        this.state = {
            showP1: false,
            showp2: false,
            level: "",
            exp,
            charClass,
            charId,
            points,
            character: { description: {} },
            levelUpStuff: new Map(),
        }
    }

    componentWillMount() {
        const server = axios.create({
            baseURL: serverURL,
        });

        // load character data, if any
        
    }

    currentLevel() {
        if(this.state.exp >= 355000){
            this.state.level = 20;
        }else if(this.state.exp >= 305000) {
            this.state.level = 19;
        }else if(this.state.exp >= 265000) {
            this.state.level = 18;
        }else if(this.state.exp >= 225000) {
            this.state.level = 17;
        }else if(this.state.exp >= 195000) {
            this.state.level = 16;
        }else if(this.state.exp >= 165000) {
            this.state.level = 15;
        }else if(this.state.exp >= 140000) {
            this.state.level = 14;
        }else if(this.state.exp >= 120000) {
            this.state.level = 13;
        }else if(this.state.exp >= 100000) {
            this.state.level = 12;
        }else if(this.state.exp >= 85000) {
            this.state.level = 11;
        }else if(this.state.exp >= 64000) {
            this.state.level = 10;
        }else if(this.state.exp >= 48000) {
            this.state.level = 9;
        }else if(this.state.exp >= 34000) {
            this.state.level = 8;
        }else if(this.state.exp >= 23000) {
            this.state.level = 7;
        }else if(this.state.exp >= 14000) {
            this.state.level = 6;
        }else if(this.state.exp >= 6500) {
            this.state.level = 5;
        }else if(this.state.exp >= 2700) {
            this.state.level = 4;
        }else if(this.state.exp >= 900) {
            this.state.level = 3;
        }else if(this.state.exp >= 300) {
            this.state.level = 2;
        }else if(this.state.exp >= 0) {
            this.state.level = 1;
        }
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
    
        if (this.state.charId !== null) {
          // Update character
          server.patch('/character/' + this.state.charId, JSON.stringify(character));
          return;
        }
    
        // Create character
        server.post('/character', JSON.stringify(character))
          .then(response => {
            const charId = response.data.CharId;
            this.setState({ charId });
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
                        <p1><div> {this.state.charId}!</div></p1>
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