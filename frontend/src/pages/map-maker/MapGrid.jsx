import React, { Component } from 'react';

// components
import MapTile from './MapTile';

import { Row } from 'react-bootstrap';

import './MapGrid.css';

class MapGrid extends Component {
  render() {
    const { x, y } = this.props;

    return (
      <div className="MapGrid">
        {
          Array.from(Array(y)).map(() => 
            <div className="row">
              { Array.from(Array(x)).map(() => <MapTile />) }
            </div>
          )
        }
      </div>
    )
  }
}

export default MapGrid;
