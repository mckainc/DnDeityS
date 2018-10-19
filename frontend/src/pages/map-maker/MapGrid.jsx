import React, { PureComponent } from 'react';

// components
import MapTile from './MapTile';

import { Row } from 'react-bootstrap';

import './MapGrid.css';

class MapGrid extends PureComponent {
  render() {
    const { x, y } = this.props;

    const rows = new Array(y);
    const cols = new Array(x);

    return (
      <div className="MapGrid">
        {
          Array.from(rows).map(() => 
            <div className="row">
              { Array.from(cols).map(() => <MapTile />) }
            </div>
          )
        }
      </div>
    )
  }
}

export default MapGrid;
