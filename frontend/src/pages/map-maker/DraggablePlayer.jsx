import React, { Component } from 'react';

import './DraggablePlayer.css';

class DraggablePlayer extends Component {
  render() {
    const path = require("../../textures/characters/" + this.props.character.image)
    const empty = this.props.empty ? 'empty' : 'nonempty';
    return <img className={"player " + empty} src={path} alt={this.props.character.name} />
  }
}

export default DraggablePlayer;