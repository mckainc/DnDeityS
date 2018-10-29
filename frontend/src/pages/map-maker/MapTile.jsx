import React, { Component } from 'react';

import tiles from '../../objects/tiles';

import './MapTile.css';

class MapTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tile: 'none',
    }
  }

  handleClick = () => {
    switch (this.props.selectedTool) {
      case 'draw':
        this.setState({ tile: this.props.selectedTile });
        break;
      case 'erase':
        this.setState({ tile: 'none' });
        break;
    }
  }

  handleDraw = () => {
    if (this.props.isMouseDown) {
      switch (this.props.selectedTool) {
        case 'draw':
          this.setState({ tile: this.props.selectedTile });
          break;
        case 'erase':
          this.setState({ tile: 'none' });
          break;
      }
    }
  }

  render() {
    const { tile } = this.state;
    return (
      <div onMouseEnter={this.handleDraw} className="MapTile" onMouseDown={this.handleClick}>
        {tile !== 'none' && <img src={tiles.get(tile)} draggable={false}/>}
        {tile === 'none' && <div className='none' />}
      </div>
    )
  }
}

export default MapTile;
