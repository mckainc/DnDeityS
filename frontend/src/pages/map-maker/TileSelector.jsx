import React, { Component } from 'react';

// components
import { Panel } from 'react-bootstrap';

import './TileSelector.css';

const tiles = ['','','','','','','','',''];

class TileSelector extends Component {
  render() {
    return (
      <div className="TileSelector">
        <Panel>
          <h4>Tile Selector</h4>
          <div className="tile-options">
            {tiles.map(tile => (
              <div className="tile"></div>
            ))}
          </div>
        </Panel>
      </div>
    )
  }
}

export default TileSelector;