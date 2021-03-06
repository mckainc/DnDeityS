import React, { Component } from 'react';
import axios from 'axios';

// types
import { Map } from 'immutable';
import serverURL from '../../objects/url.js';
import { APP_CLUSTER, APP_KEY } from '../../objects/keys';
import Pusher from 'pusher-js';

// components
import { Redirect } from 'react-router-dom';
import { Modal, Form, FormControl, Col, ControlLabel, Button, FormGroup, ListGroup, ListGroupItem } from 'react-bootstrap';

import './JoinGame.css';

class JoinGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      character: undefined,
      characters: new Map(),
      startGame: false,
      sending: false,
      searchInput: '',
      username: '',
    }
  }

  componentWillMount() {
    const server = axios.create({
      baseURL: serverURL,
    });

    const userId = localStorage.getItem('user_id');

    // Get user's characters
    server.get('/characters/' + userId)
      .then(response => {
        let characters = new Map();
        response.data.forEach(payload => {
          const character = {};
          character.id = payload[0];
          character.name = payload[1];
          character.race = payload[2];
          character.class = payload[3];
          character.image = payload[5];
          character.xval = payload[7];
          character.yval = payload[8];
          characters = characters.set(character.id, character);
        });
        this.setState({ characters });
      });
    
    // Get username
    server.get('/getusername/' + userId)
      .then(response => {
        this.setState({ username: response.data[1] });
      })
  }

  handleChange = e => {
    this.setState({ code: e.target.value });
  }

  join = () => {
    const server = axios.create({
      baseURL: serverURL,
    });

    const json = {
      channel: this.state.code,
      event: 'join-lobby',
      message: {
        username: this.state.username,
        character: this.state.character.name,
        race: this.state.character.race,
        class: this.state.character.class,
        image: this.state.character.image,
        id: this.state.character.id,
        xval: this.state.character.xval,
        yval: this.state.character.yval,
      }
    }

    server.post('/pushmessage', JSON.stringify(json));

    // Bind channel to events
    const pusher = new Pusher(APP_KEY, {
      cluster: APP_CLUSTER
    });

    const channel = pusher.subscribe(this.state.code);

    channel.bind('start-game', data => {
      localStorage.setItem('map_id', data.map);
      sessionStorage.setItem('channel', this.state.code);
      sessionStorage.setItem('characters', JSON.stringify(data.characters));
      this.setState({ startGame: true });
    })

    this.setState({ sending: true });
  }

  selectCharacter = character => {
    this.setState({ character });
    sessionStorage.setItem('character_id', character.id);
  }

  deleteCharacter = () => {
    this.setState({ character: undefined });
    sessionStorage.removeItem('character_id');
  }

  search = e => {
    this.setState({ searchInput: e.target.value });
  }

  render() {
    const { character, searchInput } = this.state;
    const filteredList = this.state.characters
      .filter(character => character.image !== null )
      .filter(character => {
      return searchInput.toLowerCase() === character.name.substring(0, searchInput.length).toLowerCase();
    }).sort((a, b) => a.name.localeCompare(b.name));

    if (this.state.startGame) {
      return <Redirect to="/Game" />
    }

    return (
      <Modal className="JoinGame" show={this.props.showJoinModal} onHide={this.props.onClose}>
        <Modal.Header closeButton>Join a Game</Modal.Header>
        <Modal.Body>
          <p><u><b>Selected Character</b></u></p>
          {typeof character !== 'undefined' &&
            <div className="selected-character">
              <ListGroupItem>
                {character.name}, {character.race} {character.class}
                <a onClick={this.deleteCharacter} href="#!"><i className="fas fa-times"></i></a>
              </ListGroupItem>
              <br />
            </div>
          }
          {typeof character === 'undefined' &&
            <div className="character-select">
              <FormControl
                name="Character Search"
                type="text"
                placeholder="Search Characters"
                onChange={this.search}
              />
              <div className="scrollable-list">
                <ListGroup>
                  {filteredList.valueSeq().map(character => (
                    <ListGroupItem onClick={() => this.selectCharacter(character)}>{character.name}, {character.race} {character.class}</ListGroupItem>
                  ))}
                </ListGroup>
              </div>
            </div>
          }
          <Form horizontal>
            <FormGroup>
              <Col sm={2}>
                <ControlLabel>Code:</ControlLabel>
              </Col>
              <Col sm={8}>
                <FormControl
                  name="code"
                  type="text"
                  placeholder="Enter Lobby Code"
                  onChange={this.handleChange}
                />
              </Col>
              {!this.state.sending && 
              <Col sm={2}>
                <Button onClick={this.join} disabled={typeof character === 'undefined'} style={{ float: 'right'}}>Join</Button>
              </Col>}
              {this.state.sending && 
              <Col sm={2}>
                <Button disabled style={{ float: 'right'}}>Waiting...</Button>
              </Col>}
            </FormGroup>
          </Form>
        </Modal.Body>
      </Modal>
    )
  }
}

export default JoinGame;
