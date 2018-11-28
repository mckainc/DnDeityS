import React, { Component } from 'react';
import axios from 'axios';

// types
import { Map } from 'immutable';
import serverURL from '../../objects/url.js';

// components
import MapGrid from '../../pages/map-maker/MapGrid';
import GameToolbar from './GameToolbar';
import { Col } from 'react-bootstrap';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: new Map(),
      x: 25,
      y: 25,
      loaded: false,
    }
  }

  componentWillMount() {
    const server = axios.create({
      baseURL: serverURL,
    });

    let mapId = localStorage.getItem('map_id');

    server.get('/map/' + mapId)
      .then(response => {
        const tiles = JSON.parse(response.data[6]);
        let map = new Map();
        let x, y;

        // height and width
        y = response.data[4];
        x = response.data[5];

        // parse tile data
        tiles.forEach(tile => {
          if (!map.has(tile.x)) {
            map = map.set(tile.x, new Map());
          }
          map = map.set(tile.x, map.get(tile.x).set(tile.y, tile));
        });

        this.setState({ map, x, y, loaded: true });
      });
  }

  render() {
    const characterId = sessionStorage.getItem('character_id');

    if (!this.state.loaded) {
      return <div className="Game" />
    }

    return (
      <div className="Game">
        <GameToolbar characterId={characterId}/>
        <Col md={10}>
          <MapGrid x={this.state.x} y={this.state.y} map={this.state.map} playing={true} />
        </Col>
        <Col md={2}>
          Character Component
        </Col>
      </div>
    )
  }
}

export default Game;