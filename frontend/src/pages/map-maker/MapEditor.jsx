import React, { Component } from 'react';

// components
import SettingsModal from './SettingsModal';
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
      showSettings: false,
      x: 25,
      y: 25,
    }
  }

  handleSettingsClose = (width, height) => {
    this.setState({ x: width, y: height, showSettings: false });
  }

  toggleModal = () => {
    this.setState({ showSettings: true });
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
        <SettingsModal
          showSettings={this.state.showSettings}
          handleSettingsClose={this.handleSettingsClose}
          x={this.state.x}
          y={this.state.y}
        />
        <Col md={1}>
          <IconToolbar changeTool={this.changeTool} selectedTool={this.state.selectedTool} />
        </Col>
        <Col md={9}>
          <LayerToolbar changeLayer={this.changeLayer} selectedLayer={this.state.selectedLayer} toggleModal={this.toggleModal} />
          <MapGrid x={this.state.x} y={this.state.y} selectedTool={this.state.selectedTool} selectedLayer={this.state.selectedLayer} />
        </Col>
        <Col md={2}>
          <TileSelector />
        </Col>
      </div>
    )
  }
}

export default MapEditor;