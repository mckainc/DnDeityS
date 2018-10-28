import React, { Component } from 'react';

// components
import SettingsModal from './SettingsModal';
import IconToolbar from './IconToolbar';
import LayerToolbar from './LayerToolbar';
import MapGrid from './MapGrid';
import TileSelector from './TileSelector';
import EventEditor from './EventEditor';

import { Col } from 'react-bootstrap';

class MapEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTool: 'draw',
      selectedLayer: 'tiles',
      selectedTile: 'dirt',
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

  changeTile = (selectedTile) => {
    this.setState({ selectedTile });
  }

  render() {
    const { selectedTile, selectedLayer, showSettings, x, y } = this.state;
    return (
      <div className="MapEditor">
        <SettingsModal
          showSettings={showSettings}
          handleSettingsClose={this.handleSettingsClose}
          x={x}
          y={y}
        />
        <Col md={1}>
          <IconToolbar changeTool={this.changeTool} selectedTool={this.state.selectedTool} />
        </Col>
        <Col md={9}>
          <LayerToolbar changeLayer={this.changeLayer} selectedLayer={this.state.selectedLayer} toggleModal={this.toggleModal} />
          <MapGrid
            x={x}
            y={y}
            selectedTool={this.state.selectedTool}
            selectedLayer={selectedLayer}
            selectedTile={selectedTile}
          />
        </Col>
        <Col md={2}>
          {selectedLayer === 'tiles' && <TileSelector changeTile={this.changeTile}/>}
          {selectedLayer === 'events' && <EventEditor />}
        </Col>
      </div>
    )
  }
}

export default MapEditor;