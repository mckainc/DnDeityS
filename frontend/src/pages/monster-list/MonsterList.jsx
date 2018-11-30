import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// types
import serverURL from '../../objects/url.js';
import { Map } from 'immutable';

// components
import SiteNavBar from '../../components/SiteNavBar';
import MonsterListItem from './MonsterListItem';

import './MonsterList.css';

class MonsterList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      monsters: new Map(),
    }
  }

  componentWillMount() {
    const server = axios.create({
      baseURL: serverURL,
    });

    const userId = localStorage.getItem('user_id');
    
    // Get user's maps
    server.get('/monsters/' + userId)
      .then(response => {
        let monsters = new Map();
        response.data.forEach(payload => {
          const monster = {};
          monster.id = payload[0];
          monster.name = payload[1];
          monsters = monsters.set(monster.id, monster);
        });
        this.setState({ monsters });
      });
  }

  deleteMonster = (monsterId) => {
    const server = axios.create({
      baseURL: serverURL,
    });

    const userId = localStorage.getItem('user_id');

    // Delete Monster
    server.delete('/monster/' + monsterId)
      .then(() => {
        // Get user's monsters
        server.get('/monsters/' + userId)
        .then(response => {
          let monsters = new Map();
          response.data.forEach(payload => {
            const monster = {};
            monster.id = payload[0];
            monster.name = payload[1];
            monsters = monsters.set(monster.id, monster);
          });
          this.setState({ monsters });
        });
      })
  }

  render() {
    const { monsters } = this.state;
    return (
      <div className="MapList">
        <SiteNavBar/>
        <div className="container">
          <div className="map-list-content">
            <h1>DnDeity</h1>
            <br />
            <h2>Monsters</h2>
            <Link to="/MonsterMaker">
              Create a new Monster!
            </Link>
            <h3>Monster List</h3>
            {monsters.valueSeq().map(monster => (
              <MonsterListItem monster={monster} deleteMonster={this.deleteMonster}/>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default MonsterList;