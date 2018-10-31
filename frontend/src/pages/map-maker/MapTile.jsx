import React, { Component } from 'react';

import tiles from '../../objects/tiles';

import './MapTile.css';

class MapTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      monster: undefined,
      tile: 'none',
    }
  }

  handleClick = () => {
    switch (this.props.selectedLayer) {
      case 'tiles':
        switch (this.props.selectedTool) {
          case 'draw':
            this.setState({ tile: this.props.selectedTile });
            break;
          case 'erase':
            this.setState({ tile: 'none' });
            break;
        }
        break;
      case 'monsters':
        switch (this.props.selectedTool) {
          case 'draw':
            this.setState({ monster: {} });
            break;
          case 'erase':
            this.setState({ monster: undefined });
            break;
        }
        break;
    }
  }

  handleDraw = () => {
    if (this.props.isMouseDown) {
      if (this.props.selectedLayer !== 'tiles') { return; } 
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
    const { tile, monster } = this.state;
    const isEmpty = typeof monster === 'undefined' ? 'empty' : 'non-empty'
    return (
      <div onMouseEnter={this.handleDraw} className="MapTile" onMouseDown={this.handleClick}>
        {tile !== 'none' &&
          <div className="tiled">
            {typeof monster !== 'undefined' && <i className="fas fa-skull" />}
            <img className={isEmpty} src={tiles.get(tile)} draggable={false}/>
          </div>
        }
        {tile === 'none' &&
          <div className='none'>
            {typeof monster !== 'undefined' && <i className="fas fa-skull" />}
          </div>
        }
      </div>
    )
  }
}

export default MapTile;
