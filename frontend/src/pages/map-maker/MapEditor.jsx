import React, { Component } from 'react';

// components
import IconToolbar from './IconToolbar';

import { Col } from 'react-bootstrap';

class MapEditor extends Component {
  render() {
    return (
      <div className="MapEditor">
        <Col md={1}>
          <IconToolbar />
        </Col>
      </div>
    )
  }
}

export default MapEditor;