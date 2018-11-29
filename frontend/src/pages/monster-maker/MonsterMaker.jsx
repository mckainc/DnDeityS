import React, { Component } from 'react';
import { FormControl, Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import { Map } from 'immutable';
import serverURL from '../../objects/url.js';

//Components
import SiteNavBar from '../../components/SiteNavBar';
import CharacterNavBar from '../../components/CharacterNavBar';
import DescriptionSection from './DescriptionSection';
import CombatSection from './CombatSection';
import AbilityScoreSection from './AbilityScoreSection';



const sections = ['Description', 'Combat', 'Ability Scores', 'Sences', 'Special Abilities', 'Actions', 'Legendary Actions', 'Saves', 'Resistances'];

class MonsterMaker extends Component {
    constructor(props){
        super(props);

        const refs = [];
        for (let i = 0;i < sections.length; i++) {
            refs.push(React.createRef());
          }

        this.state = {
            monsterId: null,
            monster: { },
            loaded: false,
            refs: refs.slice(),
        }
    }

    componentWillMount() {
        const server = axios.create({
          baseURL: serverURL,
        });
        
        // load character data, if any
        const monsterId = this.props.match.params.characterId;
        if (typeof monsterId !== 'undefined') {
          this.setState({ monsterId });
          server.get('/monster/' + monsterId)
            .then(response => {
              const monster = {};
              monster.name = response.data[3];//Description
              monster.size = response.data[4];
              monster.type = response.data[5];
              monster.subtype = response.data[6];
              monster.alignment = response.data[7];
              monster.armor_class = response.data[8];//Combat
              monster.hit_points = response.data[9];
              monster.hit_dice = response.data[10];
              monster.speed = response.data[11];
              monster.ability_scores = JSON.parse(response.data[12]);//Ability Score
              monster.saves = JSON.parse(response.data[13]);
              monster.damage_vulnerabilities = response.data[14];
              monster.resistances = response.data[15];
              monster.immunities = response.data[16];
              monster.challenge_rating = response.data[17];//Combat
              monster.special_abilities = JSON.parse(response.data[18]);
              monster.actions = JSON.parse(response.data[19]);
              monster.legendary_actions = JSON.parse(response.data[20]);
              this.setState({ monster, loaded: true });
            })
        }
      }

    //subProperty would be which attack or action it is
    changeMonster = (property, subProperty, value, isList) => {
        const { monster } = this.state;
        if(isList === true){
            monster[property][subProperty] = value;
        } else {
            monster[property] = value;
        }
    }

    render(){
        const { monster, loaded } = this.state;
        const monsterId = this.props.match.params.monsterId;
        if (typeof monsterId !== 'undefined' && !loaded) {
            return <div className="MonsterMaker"></div>
        }

        return (
            <div className="MonsterMaker">
                <SiteNavBar enableSave save={this.saveCharacter}/>
                <Grid fluid className="character-grid">
                    <Row>
                        <Col xs={1} md={1}>
                             <CharacterNavBar refs={this.state.refs} sections={sections}/>
                         </Col>
                         <Col xs={17} md={11}>
                             <h1>Monster Maker</h1>
                             <DescriptionSection ref={this.state.refs[0]} changeMonster={this.changeMonster} monster={monster} loaded={loaded}/>
                             <CombatSection ref={this.state.refs[1]} changeMonster={this.changeMonster} monster={monster} loaded={loaded}/>
                             <AbilityScoreSection ref={this.state.refs[1]} changeMonster={this.changeMonster} monster={monster} loaded={loaded}/>
                        </Col>
                    </Row>
                  </Grid>
            </div>
        );
    }
}

export default MonsterMaker;