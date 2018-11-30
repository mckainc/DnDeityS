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
import SencesSection from './SencesSection';
import SpecialAbilitiesSection from './SpecialAbilitiesSection';
import ActionsSection from './ActionsSection';
import LegendarySection from './LegendarySection';
import SaveSection from './SavesSection';
import ResistancesSection from './ResistincesSection';

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
            monster: { description: { actions: {}, special_abilities: {} } },
            loaded: false,
            refs: refs.slice(),
        }
    }

    componentWillMount() {
        const server = axios.create({
          baseURL: serverURL,
        });
        
        // load monster data, if any
        const monsterId = this.props.match.params.monsterId;
        if (typeof monsterId !== 'undefined') {
          this.setState({ monsterId });
          server.get('/monster/' + monsterId)
            .then(response => {
              const monster = {};
              monster.description = JSON.parse(response.data[4]);
              monster.name = response.data[3];
              this.setState({ monster, loaded: true });
            })
        }
      }

    saveMonster = () => {
        const { monster } = this.state;
        const server = axios.create({
            baseURL: serverURL,
        });

        const userId = localStorage.getItem('user_id');
        monster['user_id'] = userId;

         if (this.state.monsterId !== null) {
            server.patch('/monster/' + this.state.monsterId, JSON.stringify(monster));
            return;
         }

        // Create monster
        server.post('/monster', JSON.stringify(monster))
        .then(response => {
            const monsterId = response.data.monsterId;
            this.setState({ monsterId });
        })
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
                <SiteNavBar enableSave save={this.saveMonster}/>
                <Grid fluid className="character-grid">
                    <Row>
                        <Col xs={1} md={1}>
                             <CharacterNavBar refs={this.state.refs} sections={sections}/>
                         </Col>
                         <Col xs={17} md={11}>
                             <h1>Monster Maker</h1>
                             <DescriptionSection ref={this.state.refs[0]} changeMonster={this.changeMonster} monster={monster} loaded={loaded}/>
                             <CombatSection ref={this.state.refs[1]} changeMonster={this.changeMonster} monster={monster} loaded={loaded}/>
                             <AbilityScoreSection ref={this.state.refs[2]} changeMonster={this.changeMonster} monster={monster.description} loaded={loaded}/>
                             <SencesSection ref={this.state.refs[3]} changeMonster={this.changeMonster} monster={monster.description} loaded={loaded}/>
                             <SpecialAbilitiesSection ref={this.state.refs[4]} changeMonster={this.changeMonster} monster={monster} loaded={loaded}/>
                        </Col>
                    </Row>
                  </Grid>
            </div>
        );
    }
}

export default MonsterMaker;

/*

                             <AbilityScoreSection ref={this.state.refs[2]} changeMonster={this.changeMonster} monster={monster} loaded={loaded}/>
                             <SencesSection ref={this.state.refs[3]} changeMonster={this.changeMonster} monster={monster} loaded={loaded}/>
                             <SpecialAbilitiesSection ref={this.state.refs[4]} changeMonster={this.changeMonster} monster={monster} loaded={loaded}/>

*/