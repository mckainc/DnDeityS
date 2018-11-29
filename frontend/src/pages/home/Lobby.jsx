import React, { Component } from 'react';
import axios from 'axios';

// types
import serverURL from '../../objects/url.js';
import { List, Map } from 'immutable';
import { APP_CLUSTER, APP_KEY } from '../../objects/keys';
import Pusher from 'pusher-js';

// components
import { Redirect } from 'react-router-dom';
import { Modal, Button, ListGroup, ListGroupItem, FormControl } from 'react-bootstrap';

import './Lobby.css';

const generateCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = '';
  for (let i = 0;i < 4;i++) {
    code += chars.charAt(Math.floor(Math.random() * (chars.length - 1)));
  }

  return code;
}

class Lobby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      map: undefined,
      maps: new Map(),
      players: new List(),
      startGame: false,
      searchInput: '',
    }
  }

  componentWillMount() {
    const server = axios.create({
      baseURL: serverURL,
    });

    const userId = localStorage.getItem('user_id');

    // Get user's maps
    server.get('/maps/' + userId)
      .then(response => {
        let maps = new Map();
        response.data.forEach(payload => {
          const map = {};
          map.id = payload[0];
          map.name = payload[3];
          map.height = payload[4];
          map.width = payload[5];
          maps = maps.set(map.id, map);
        });
        this.setState({ maps });
      });

    // Set up lobby
    const pusher = new Pusher(APP_KEY, {
      cluster: APP_CLUSTER
    });

    const code = generateCode();
    const channel = pusher.subscribe(code);

    channel.bind('join-lobby', player => {
      this.setState({ players: this.state.players.push(player)});
    })

    this.setState({ code });
  }

  startGame = () => {
    this.setState({ startGame: true });

    sessionStorage.setItem('character_id', -1);
    sessionStorage.setItem('characters', JSON.stringify(this.state.players.toArray()));

    const server = axios.create({
      baseURL: serverURL,
    });

    const json = {
      channel: this.state.code,
      event: 'start-game',
      message: {
        map: this.state.map.id,
        characters: this.state.players.toArray(),
      }
    }

    localStorage.setItem('map_id', this.state.map.id)

    server.post('/pushmessage', JSON.stringify(json));
  }

  selectMap = map => {
    this.setState({ map });
  }

  deleteMap = () => {
    this.setState({ map: undefined });
  }

  search = e => {
    this.setState({ searchInput: e.target.value });
  }

  render() {
    const { map, searchInput } = this.state;
    const filteredList = this.state.maps.filter(map => {
      return searchInput.toLowerCase() === map.name.substring(0, searchInput.length).toLowerCase();
    }).sort((a, b) => a.name.localeCompare(b.name));

    if (this.state.startGame) {
      return <Redirect to="/Game"/>
    }

    return (
      <Modal className="Lobby" show={this.props.showLobbyModal} onHide={this.props.onClose}>
        <Modal.Header closeButton>Create a Lobby</Modal.Header>
        <Modal.Body>
          <p>Lobby Code: {this.state.code}</p>
          <p><u><b>Joined Players</b></u></p>
          {this.state.players.valueSeq().map(player => (
            <p>
              <b>Player: </b>{player.username}
              <b> Character: </b>
              {player.character}, {player.race} {player.class}
            </p>
          ))}
          <p><u><b>Selected Map</b></u></p>
          {typeof map !== 'undefined' &&
            <div className="selected-map">
              <ListGroupItem>
                {map.name}
                <a onClick={this.deleteMap} href="#!"><i className="fas fa-times"></i></a>
              </ListGroupItem>
              <br />
            </div>
          }
          {typeof map === 'undefined' &&
            <div className="map-select">
              <FormControl
                name="Map Search"
                type="text"
                placeholder="Search Maps"
                onChange={this.search}
              />
              <div className="scrollable-list">
                <ListGroup>
                  {filteredList.valueSeq().map(map => (
                    <ListGroupItem onClick={() => this.selectMap(map)}>{map.name}</ListGroupItem>
                  ))}
                </ListGroup>
              </div>
            </div>
          }
          <Button disabled={typeof map === 'undefined'} onClick={this.startGame}>Start Game</Button>
        </Modal.Body>
      </Modal>
    )
  }
}

export default Lobby;