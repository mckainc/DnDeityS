import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

import tiles from '../../objects/tiles';

// components
import DraggablePlayer from './DraggablePlayer';

import './MapTile.css';

// Type for drag and drop
const PlayerType = {
  PLAYER: 'player',
}

// Methods for drag and drop
const TileTarget = {
  drop(props, monitor) {
    const character = monitor.getItem().character;
    props.moveEvent(props.x, props.y, character)
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class MapTile extends Component {
  constructor(props) {
    super(props);

    let monster = undefined;
    let event = undefined;
    let tile = 'none';

    if (props.map.has(props.x) && props.map.get(props.x).has(props.y)) {
      const data = props.map.get(props.x).get(props.y);

      tile = data.tile;
      monster = data.monster;
      event = data.event;
    }

    this.state = {
      monster,
      event,
      tile,
    }
  }

  handleClick = () => {
    const { x, y } = this.props;
    switch (this.props.selectedLayer) {
      case 'tiles':
        switch (this.props.selectedTool) {
          case 'draw':
            this.props.editTile(x, y, 'tile', this.props.selectedTile);
            this.setState({ tile: this.props.selectedTile });
            break;
          case 'erase':
            this.props.editTile(x, y, 'tile', 'none');
            this.setState({ tile: 'none' });
            break;
        }
        break;
      case 'monsters':
        if (typeof this.state.event !== 'undefined') return;
        switch (this.props.selectedTool) {
          case 'draw':
            this.props.selectTile(x, y);
            this.props.editTile(x, y, 'monster', {});
            this.setState({ monster: {} });
            break;
          case 'erase':
            this.props.editTile(x, y, 'monster', undefined);
            this.setState({ monster: undefined });
            break;
          case 'edit':
            this.props.selectTile(x, y);
            break;
        }
        break;
      case 'events':
      if (typeof this.state.monster !== 'undefined') return;
        switch (this.props.selectedTool) {
          case 'draw':
            this.props.selectTile(x, y);
            this.props.editTile(x, y, 'event', {});
            this.setState({ event: {} });
            break;
          case 'erase':
            this.props.editTile(x, y, 'event', undefined);
            this.setState({ event: undefined });
            break;
          case 'edit':
            this.props.selectTile(x, y);
            break;
        }
        break;
    }
  }

  handleDraw = () => {
    const { x, y } = this.props
    if (this.props.isMouseDown) {
      if (this.props.selectedLayer !== 'tiles') { return; } 
      switch (this.props.selectedTool) {
        case 'draw':
          this.props.editTile(x, y, 'tile', this.props.selectedTile);
          this.setState({ tile: this.props.selectedTile });
          break;
        case 'erase':
          this.props.editTile(x, y, 'tile', 'none');
          this.setState({ tile: 'none' });
          break;
      }
    }
  }

  render() {
    const { characters, connectDropTarget } = this.props;
    const { tile, monster, event } = this.state;
    let isEmpty;
    if (typeof monster !== 'undefined') {
      isEmpty = 'monster';
    } else if (typeof event !== 'undefined') {
      isEmpty = 'event';
    } else {
      isEmpty = 'empty';
    }

    let character = undefined;
    if (typeof characters !== 'undefined' && characters.has(this.props.x + ',' + this.props.y)) {
      character = characters.get(this.props.x + ',' + this.props.y);
    }

    return connectDropTarget(
      <div onMouseEnter={this.handleDraw} className="MapTile" onMouseDown={this.handleClick}>
        {tile !== 'none' &&
          <div className="tiled">
            {typeof monster !== 'undefined' && <i className="fas fa-skull" draggable={false}/>}
            {typeof event !== 'undefined' && <i className="fas fa-exclamation" draggable={false}/>}
            <img className={isEmpty} src={tiles.get(tile)} draggable={false}/>
            {typeof character !== 'undefined' && <DraggablePlayer character={character} empty={false} /> }
          </div>
        }
        {tile === 'none' &&
          <div className='none'>
            {typeof monster !== 'undefined' && <i className="fas fa-skull" draggable={false}/>}
            {typeof event !== 'undefined' && <i className="fas fa-exclamation" draggable={false}/>}
            {typeof character !== 'undefined' && <DraggablePlayer character={character} empty /> }
          </div>
        }
      </div>
    )
  }
}

export default DropTarget(PlayerType.PLAYER, TileTarget, collect)(MapTile);
