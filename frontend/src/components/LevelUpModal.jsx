import React, { Component } from 'react';
import axios from 'axios';

//types
import { Map } from 'immutable';
import RaceType from '../objects/RaceType'
import serverURL from '../objects/url.js';

import LevelUpClassDetails from './LevelUpClassDetails';
import LevelUpFeatures from './LevelUpFeatures';
import LevelUpScores from '../components/LevelUpScores'
import LevelUpFeats from '../components/LevelUpFeats'
import './levelUpModal.css'

import { Modal, Button,  } from 'react-bootstrap';




//const parts = ['Proficency', 'HitPoints', 'AbilityScore', 'Feats', 'Description' ];


class LevelUpModal extends Component {
    constructor(props, context){
        super(props, context);

        this.handleShowP1 = this.handleShowP1.bind(this);
        this.handleCloseP1 = this.handleCloseP1.bind(this);
        this.handleShowP2 = this.handleShowP2.bind(this);
        this.handleCloseP2 = this.handleCloseP2.bind(this);
        this.handleAbility = this.handleAbility.bind(this);
        this.handleFeat = this.handleFeat.bind(this);

        //characters user id, used for saving changes
        //refering to character passed by props, not local variable

        let points = props.ability_scores;
        let charClass = props.loaded ? props.character.class : 'none';
        let character = props.loaded ? props.character : 'none';
        //HEY I CHANGED XP TO A FIXED VALUE
        let exp = 6520;//enough for level 5
        let charId = props.charId;
        let name = props.name;


        let Tlevel = props.loaded ? props.character.description.level : 'undefinded';
        if (typeof Tlevel === 'undefined') {
            //level = 2;
            props.changeCharacter('level', 1, true)
            //console.log(character.description.level);
        }
        let level = props.loaded ? props.character.description.level : 'undefinded';
        //level is now the level the character is about to be, has not been saved
        //level++;
        level = level + 8;
        //console.log(level);
        this.state = {
            showP1: false,
            showp2: false,
            feat: false,
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
        //console.log("WILLLLLLLLLLLLLLL MOUNTTTTTTTTTTTT");
        if(!this.props.loaded){
            return;
        }
        const server = axios.create({
            baseURL: serverURL,
        });
        const charClass = this.state.charClass;
        const level = this.state.level;
       // console.log(charClass);
        //console.log(level);
        //Make Server request for all class imporvements
        //JSON.stringify(this.state.level)
        var obj = { charClass, level }
        server.post('/features', JSON.stringify(obj))
            .then((response) => {
                let levelUpStuff = new Map();
                response.data.forEach(payload => {
                    const c = new RaceType(payload[1], payload[4]);
                    levelUpStuff = levelUpStuff.set(c.name, c);
                   // console.log("willmount");
                    //console.log(levelUpStuff);
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
       // console.log("Inside current Level");
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

    handleFeat() {
        this.setState({feat: true});
        //this.forceUpdate();
        //console.log(this.state.feats);
       // this.featOrAbility();
    }

    handleAbility() {
        this.setState({feat: false});
        //this.forceUpdate();
        //console.log(this.state.feats);
       // this.featOrAbility();
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

      //
      //show={this.state.showP1}

    render(){
        
        //console.log("class from levelUpModal")
       // console.log(this.props.classes.get(character.class));

        if(!this.props.loaded){
            return <div></div>
        }

        const { character } = this.props;
        const { level } = this.state.level;
        const { loaded } = this.props;
        const { levelUpStuff } = this.state.levelUpStuff;
       // console.log(levelUpStuff);
        //console.log(this.state.charClass);
       // console.log(this.state.level);
       console.log(this.state.feats);
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
                        <p1>Please know that you will be unable to revert the characters level.</p1>
                        <br />
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
                        <LevelUpClassDetails currentClass={this.props.classes.get(this.props.character.class)} level={level} changeCharacter={this.changeCharacter} character={character} loaded={loaded} classes={this.props}/>
                        {this.state.level % 4 === 0 ? (
                            <div>
                                <Button onClick={this.handleAbility}>Ability</Button>
                                <Button onClick={this.handleFeat}>Feats</Button>
                                {!this.state.feat ?  <LevelUpScores 
                                                    changeCharacter={this.props.changeCharacter} 
                                                    character={this.props.character} 
                                                    loaded={this.props.loaded}/> :

                                             <LevelUpFeats 
                                                    changeCharacter={this.props.changeCharacter} 
                                                    character={this.props.character} 
                                                    loaded={this.props.loaded} 
                                                    feats={this.state.feats}/> }
                            </div>  ) : (<p>Not level 4</p>) }

                        <LevelUpFeatures levelUpStuff={this.state.levelUpStuff} changeCharacter={this.changeCharacter} loaded={this.loaded}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleCloseP2}>Close</Button>
                        <Button className="save" bsSize="xsmall" onClick={this.saveCharacter}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default LevelUpModal;