import React, { Component } from 'react';

// types
import axios from 'axios';
import { APP_CLUSTER, APP_KEY } from '../../objects/keys';
import serverURL from '../../objects/url.js';
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
    const pusher = new Pusher(APP_KEY, {
      cluster: APP_CLUSTER
    });

    const code = generateCode();
    const channel = pusher.subscribe(code);

    channel.bind('test-event', data => console.log(data))

    const server = axios.create({
      baseURL: serverURL,
    });

    const json = {
      channel: code,
      event: 'test-event',
      message: {
        testField: 'test'
      }
    }

    server.post('/pushmessage', JSON.stringify(json))
      .then(response => {
        console.log(response)
      })

    // TODO bind channel to events

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