import React, { Component } from 'react';

// types
import { List } from 'immutable';
import { APP_CLUSTER, APP_KEY } from '../../objects/keys';
import Pusher from 'pusher-js';

// components
import { Modal, Button } from 'react-bootstrap';

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
      players: new List(),
    }
  }

  componentWillMount() {
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

  render() {
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
          <Button>Start Game</Button>
        </Modal.Body>
      </Modal>
    )
  }
}

export default Lobby;