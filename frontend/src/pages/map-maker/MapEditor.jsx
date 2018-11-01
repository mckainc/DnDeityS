import React, { Component } from 'react';
import axios from 'axios';

// types
import { Map } from 'immutable';
import RaceType from '../../objects/RaceType';
import serverURL from '../../objects/url.js';

// components
import SettingsModal from './SettingsModal';
import IconToolbar from './IconToolbar';
import LayerToolbar from './LayerToolbar';
import MapGrid from './MapGrid';
import TileSelector from './TileSelector';
import EventEditor from './EventEditor';
import MonsterEditor from './MonsterEditor';

import { Col } from 'react-bootstrap';

class MapEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      monsters: new Map(),
      selectedX: 'none',
      selectedY: 'none',
      selectedTool: 'draw',
      selectedLayer: 'tiles',
      selectedTile: 'dirt',
      showSettings: false,
      x: 25,
      y: 25,
    }
  }

  componentWillMount() {
    const server = axios.create({
      baseURL: serverURL,
    });

    // Make server request for list of monsters
    server.get('/monsters')
      .then((response) => {
        let monsters = new Map();
        response.data.forEach(payload => {
          const monster = new RaceType(payload[1], payload[2]);
          monsters = monsters.set(monster.name, monster);
        });
        this.setState({ monsters });
      });
  }

  selectTile = (selectedX, selectedY) => {
    this.setState({ selectedX, selectedY });
  }

  handleSettingsClose = (width, height, name) => {
    this.props.updateInfo(width, height, name);
    this.setState({ x: width, y: height, showSettings: false });
  }

  toggleModal = () => {
    this.setState({ showSettings: true });
  }

  changeTool = (selectedTool) => {
    this.setState({ selectedTool });
  }

  changeLayer = (selectedLayer) => {
    this.setState({ selectedLayer, selectedX: 'none', selectedY: 'none' });
  }

  changeTile = (selectedTile) => {
    this.setState({ selectedTile });
  }

  render() {
    const { monsters, selectedTile, selectedLayer, showSettings, x, y } = this.state;
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
            editTile={this.props.editTile}
            map={this.props.map}
            x={x}
            y={y}
            selectedX={this.state.selectedX}
            selectedY={this.state.selectedY}
            selectedTool={this.state.selectedTool}
            selectedLayer={selectedLayer}
            selectedTile={selectedTile}
            selectTile={this.selectTile}
          />
        </Col>
        <Col md={2}>
          {selectedLayer === 'tiles' && <TileSelector changeTile={this.changeTile} />}
          {selectedLayer === 'events' &&
            <EventEditor editTile={this.props.editTile} map={this.props.map} selectedX={this.state.selectedX} selectedY={this.state.selectedY}/>}
          {selectedLayer === 'monsters' &&
            <MonsterEditor monsters={monsters} editTile={this.props.editTile} map={this.props.map} selectedX={this.state.selectedX} selectedY={this.state.selectedY}/>}
        </Col>
      </div>
    )
  }
}

export default MapEditor;