import React, { Component } from 'react';

import tiles from '../../objects/tiles';

import './MapTile.css';

class MapTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      monster: undefined,
      event: undefined,
      tile: 'none',
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
    const { tile, monster, event } = this.state;
    let isEmpty;
    if (typeof monster !== 'undefined') {
      isEmpty = 'monster';
    } else if (typeof event !== 'undefined') {
      isEmpty = 'event';
    } else {
      isEmpty = 'empty';
    }

    return (
      <div onMouseEnter={this.handleDraw} className="MapTile" onMouseDown={this.handleClick}>
        {tile !== 'none' &&
          <div className="tiled">
            {typeof monster !== 'undefined' && <i className="fas fa-skull" draggable={false}/>}
            {typeof event !== 'undefined' && <i className="fas fa-exclamation" draggable={false}/>}
            <img className={isEmpty} src={tiles.get(tile)} draggable={false}/>
          </div>
        }
        {tile === 'none' &&
          <div className='none'>
            {typeof monster !== 'undefined' && <i className="fas fa-skull" draggable={false}/>}
            {typeof event !== 'undefined' && <i className="fas fa-exclamation" draggable={false}/>}
          </div>
        }
      </div>
    )
  }
}

export default MapTile;
