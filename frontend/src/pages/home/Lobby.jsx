import React, { Component } from 'react';

import { APP_ID, APP_CLUSTER, APP_SECRET, APP_KEY } from '../../objects/keys';
import Pusher from 'pusher-js';

const generateCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = '';
  for (let i = 0;i < 4;i++) {
    code += chars.charAt(Math.floor(Math.random() * (chars.length - 1)));
  }

  return code;
}

class Lobby extends Component {
  componentWillMount() {
    var pusher = new Pusher(APP_KEY, {
      cluster: APP_CLUSTER
    });

    const code = generateCode();
    const channel = pusher.subscribe(code);
  }

  render() {
    return (
      <div className="Lobby">
        Lobby
      </div>
    )
  }
}

export default Lobby;