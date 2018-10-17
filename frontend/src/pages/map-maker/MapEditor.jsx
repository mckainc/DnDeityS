import React, { Component } from 'react';

// components
import IconToolbar from './IconToolbar';
import MapGrid from './MapGrid';
import TileSelector from './TileSelector';

import { Col } from 'react-bootstrap';

class MapEditor extends Component {
  render() {
    return (
      <div className="MapEditor">
        <Col md={1}>
          <IconToolbar />
        </Col>
        <Col md={9}>
          <MapGrid x={25} y={25} />
        </Col>
        <Col md={2}>
          <TileSelector />
        </Col>
      </div>
    )
  }
}

export default MapEditor;