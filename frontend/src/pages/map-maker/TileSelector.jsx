import React, { Component } from 'react';

import tiles from '../../objects/tiles.js';

// components
import { Panel } from 'react-bootstrap';

import './TileSelector.css';

const tileList = ['dirt','grass','stone','wood','','','','',''];

class TileSelector extends Component {
  render() {
    return (
      <div className="TileSelector">
        <Panel>
          <h4>Tile Selector</h4>
          <div className="tile-options">
            {tileList.map(tile => (
              <div className="tile" onClick={() => this.props.changeTile(tile)}>
                <img src={tiles.get(tile)} />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    )
  }
}

export default TileSelector;