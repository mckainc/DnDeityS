import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

import './DraggablePlayer.css';

// Type for drag and drop
const PlayerType = {
  PLAYER: 'player',
}

const playerSource = {
  beginDrag(props) {
    return { character: props.character }
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class DraggablePlayer extends Component {
  render() {
    const { connectDragSource } = this.props;
    const path = require("../../textures/characters/" + this.props.character.image)
    const empty = this.props.empty ? 'empty' : 'nonempty';
    return connectDragSource(
      <img className={"player " + empty} src={path} alt={this.props.character.name} />
    );
  }
}

export default DragSource(PlayerType.PLAYER, playerSource, collect)(DraggablePlayer);