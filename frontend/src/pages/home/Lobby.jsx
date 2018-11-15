import React, { Component } from 'react';

// types
import { APP_ID, APP_CLUSTER, APP_SECRET, APP_KEY } from '../../objects/keys';
import Pusher from 'pusher-js';

// components
import { Modal } from 'react-bootstrap';

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
    }
  }

  componentWillMount() {
    var pusher = new Pusher(APP_KEY, {
      cluster: APP_CLUSTER
    });

    const code = generateCode();
    const channel = pusher.subscribe(code);

    this.setState({ code });
  }

  render() {
    return (
      <Modal className="Lobby" show={this.props.showLobbyModal} onHide={this.props.onClose}>
        <Modal.Header closeButton>Create a Lobby</Modal.Header>
        <Modal.Body>
          <p>Loby Code: {this.state.code}</p>
        </Modal.Body>
      </Modal>
    )
  }
}

export default Lobby;