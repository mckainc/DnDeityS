import React, { Component } from 'react';

// components
import IconToolbar from './IconToolbar';
import MapGrid from './MapGrid';

import { Col } from 'react-bootstrap';

class MapEditor extends Component {
  render() {
    return (
      <div className="MapEditor">
        <Col md={1}>
          <IconToolbar />
        </Col>
        <Col md={10}>
          <MapGrid x={25} y={25} />
        </Col>
      </div>
    )
  }
}

export default MapEditor;