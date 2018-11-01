import React, { Component } from 'react';
import axios from 'axios';

//types
import { Map } from 'immutable';
import RaceType from '../objects/RaceType'
import serverURL from '../objects/url.js';

import LevelUpClassDetails from './LevelUpClassDetails';
import LevelUpFeatures from './LevelUpFeatures';

import { Modal, Button,  } from 'react-bootstrap';




//const parts = ['Proficency', 'HitPoints', 'AbilityScore', 'Feats', 'Description' ];


class LevelUpModal extends Component {
    constructor(props, context){
        super(props, context);

        this.handleShowP1 = this.handleShowP1.bind(this);
        this.handleCloseP1 = this.handleCloseP1.bind(this);
        this.handleShowP2 = this.handleShowP2.bind(this);
        this.handleCloseP2 = this.handleCloseP2.bind(this);

        //characters user id, used for saving changes
        //refering to character passed by props, not local variable

        let points = props.ability_scores;
        let charClass = props.loaded ? props.character.class : 'none';
        let character = props.loaded ? props.character : 'none';
        //HEY I CHANGED XP TO A FIXED VALUE
        let exp = 6520;//enough for level 5
        let level = 3;
        let charId = props.charId;
        let name = props.name;

        this.state = {
            showP1: false,
            showp2: false,
            level,
            exp,
            charClass,
            character,
            charId,
            points,
            name,
            levelUpStuff: new Map(),
            feats: new Map(),
        }
    }

    componentWillMount() {
        const server = axios.create({
            baseURL: serverURL,
        });
        const charClass = this.state.charClass;
        const level = this.state.level;
        //Make Server request for all class imporvements
        //JSON.stringify(this.state.level)
        var obj = { charClass, level }
        server.post('/features', JSON.stringify(obj))
            .then((response) => {
                let levelUpStuff = new Map();
                response.data.forEach(payload => {
                    const c = new RaceType(payload[1], payload[4]);
                    levelUpStuff = levelUpStuff.set(c.name, c);
                });
                this.setState({ levelUpStuff });
            });

            server.get('/feats')
            .then((response) => {
                let feats = new Map();
                response.data.forEach(payload => {
                    const c = new RaceType(payload[2], payload[1]);
                    feats = feats.set(c.name, c);
                });
                this.setState({ feats });
            });

           
    }

    currentLevel() {
        console.log("Inside current Level");
        if(this.state.exp >= 355000){
            this.setState({ level: 20});
        }else if(this.state.exp >= 305000) {
            this.setState({ level: 19});
        }else if(this.state.exp >= 265000) {
            this.setState({ level: 18});
        }else if(this.state.exp >= 225000) {
            this.setState({ level: 17});
        }else if(this.state.exp >= 195000) {
            this.setState({ level: 16});
        }else if(this.state.exp >= 165000) {
            this.setState({ level: 15});
        }else if(this.state.exp >= 140000) {
            this.setState({ level: 14});
        }else if(this.state.exp >= 120000) {
            this.setState({ level: 13});
        }else if(this.state.exp >= 100000) {
            this.setState({ level: 12});
        }else if(this.state.exp >= 85000) {
            this.setState({ level: 11});
        }else if(this.state.exp >= 64000) {
            this.setState({ level: 10});
        }else if(this.state.exp >= 48000) {
            this.setState({ level: 9});
        }else if(this.state.exp >= 34000) {
            this.setState({ level: 8});
        }else if(this.state.exp >= 23000) {
            this.setState({ level: 7});
        }else if(this.state.exp >= 14000) {
            this.setState({ level: 6});
        }else if(this.state.exp >= 6500) {
            this.setState({ level: 5});
        }else if(this.state.exp >= 2700) {
            this.setState({ level: 4});
        }else if(this.state.exp >= 900) {
            this.setState({ level: 3});
        }else if(this.state.exp >= 300) {
            this.setState({ level: 2});
        }else if(this.state.exp >= 0) {
            this.setState({ level: 1});
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
        this.setState({ showP1: false});

        //this.currentLevel();
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

      //show={this.state.showP1}

    render(){
        const { character } = this.props;
       // const { levelUpStuff } = this.state.levelUpStuff;
        const { level } = this.state.level;
        const { loaded } = this.props;

        if(!this.props.loaded){
            return <div></div>
        }
        

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
                        <LevelUpClassDetails level={level} changeCharacter={this.changeCharacter} character={character} loaded={loaded}/>
                        <LevelUpFeatures levelUpStuff={this.state.levelUpStuff} changeCharacter={this.changeCharacter} loaded={this.loaded}/>
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