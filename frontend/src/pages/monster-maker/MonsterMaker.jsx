import React, { Component } from 'react';
import { FormControl, Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import { Map } from 'immutable';
import serverURL from '../../objects/url.js';

const sections = ['Description', 'Combat', 'Ability Scores', 'Sences', 'Special Abilities', 'Actions', 'Legendary Actions', 'Saves', 'Resistances'];

class MonsterMaker extends Component {
    constructor(props){
        super(props);

        this.state = {
            monsterId: null,
            monster: { },
            loaded: false,
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
              monster.name = response.data[3];
              monster.size = response.data[4];
              monster.type = response.data[5];
              monster.subtype = response.data[6];
              monster.alignment = response.data[7];
              monster.armor_class = response.data[8];
              monster.hit_points = response.data[9];
              monster.hit_dice = response.data[10];
              monster.speed = response.data[11];
              monster.ability_scores = JSON.parse(response.data[12]);
              monster.saves = JSON.parse(response.data[13]);
              monster.damage_vulnerabilities = response.data[14];
              monster.resistances = response.data[15];
              monster.immunities = response.data[16];
              monster.challenge_rating = response.data[17];
              monster.special_abilities = JSON.parse(response.data[18]);
              monster.actions = JSON.parse(response.data[19]);
              monster.legendary_actions = JSON.parse(response.data[20]);
              this.setState({ monster, loaded: true });
            })
        }
      }

    render(){

        return (
            <div>

            </div>
        );
    }
}

export default MonsterMaker;