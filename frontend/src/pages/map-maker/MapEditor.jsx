import React, { Component } from 'react';

// components
import IconToolbar from './IconToolbar';
import LayerToolbar from './LayerToolbar';
import MapGrid from './MapGrid';
import TileSelector from './TileSelector';

import { Col } from 'react-bootstrap';

class MapEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTool: 'draw',
      selectedLayer: 'tiles',
    }
  }

  changeTool = (selectedTool) => {
    this.setState({ selectedTool });
  }

  changeLayer = (selectedLayer) => {
    this.setState({ selectedLayer });
  }

  render() {
    return (
      <div className="MapEditor">
        <Col md={1}>
          <IconToolbar changeTool={this.changeTool} selectedTool={this.state.selectedTool} />
        </Col>
        <Col md={9}>
          <LayerToolbar changeLayer={this.changeLayer} selectedLayer={this.state.selectedLayer} />
          <MapGrid x={25} y={25} selectedTool={this.state.selectedTool} />
        </Col>
        <Col md={2}>
          <TileSelector />
        </Col>
      </div>
    )
  }
}

export default MapEditor;