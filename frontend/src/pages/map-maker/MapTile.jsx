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
    this.setState({ tile: this.props.selectedTile });
  }

  handleDraw = () => {
    if (this.props.isMouseDown) {
      this.setState({ tile: this.props.selectedTile });
    }
  }

  render() {
    const { tile } = this.state;
    return (
      <div onMouseOver={this.handleDraw} className="MapTile" onMouseDown={this.handleClick}>
        <img src={tiles.get(tile)} draggable={false}/>
      </div>
    )
  }
}

export default MapTile;
