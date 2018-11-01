import React, { Component } from 'react';
import axios from 'axios';

// types
import { Map } from 'immutable';
import serverURL from '../../objects/url.js';

// components
import SiteNavBar from '../../components/SiteNavBar';
import MapEditor from './MapEditor';

import './MapMaker.css';

class MapMaker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: new Map(),
      loaded: false,
      mapId: null,
      mapInfo: { name: 'Untitled', height: 25, width: 25 }
    }
  }

  componentWillMount() {
    const server = axios.create({
      baseURL: serverURL,
    });

    // load map data, if any
    const mapId = this.props.match.params.mapId;
    if (typeof mapId !== 'undefined') {
      this.setState({ mapId });
      server.get('/map/' + mapId)
        .then(response => {
          const tiles = JSON.parse(response.data[6]);
          let map = new Map();

          // parse tile data
          tiles.forEach(tile => {
            if (!map.has(tile.x)) {
              map = map.set(tile.x, new Map());
            }
            map = map.set(tile.x, map.get(tile.x).set(tile.y, tile));
          });

          this.setState({ map, loaded: true });
        });
    }
  }

  editTile = (x, y, type, data) => {
    const { map } = this.state;
    let newMap = map;
    if (!newMap.has(x)) {
      newMap = newMap.set(x, new Map());
    }
    let tile = {};
    if (newMap.get(x).has(y)) {
      tile = newMap.get(x).get(y);
    }
    tile[type] = data;
    newMap = newMap.set(x, newMap.get(x).set(y, tile));

    this.setState({ map: newMap });
  }

  updateInfo = (width, height, name) => {
    this.setState({ mapInfo: { name, height, width }});
  }

  saveMap = () => {
    const { map, mapInfo } = this.state;
    const server = axios.create({
      baseURL: serverURL,
    });
    let mapJSON = {};

    // push all of the tiles onto an array
    let tiles = [];
    map.forEach((xmap, x) => xmap.forEach((tile, y) => {
      const t = tile;
      t.x = x;
      t.y = y;
      tiles.push(t);
    }));

    mapJSON.tiles = tiles;

    // add map info
    mapJSON.name = mapInfo.name;
    mapJSON.height = mapInfo.height;
    mapJSON.width = mapInfo.width;

    // add user id
    const userId = localStorage.getItem('user_id');
    mapJSON['user_id'] = userId;

    if (this.state.mapId !== null) {
      // Update map
      server.patch('/map/' + this.state.mapId, JSON.stringify(mapJSON));
      return;
    }

    // Create map
    server.post('/map', JSON.stringify(mapJSON))
      .then(response => {
        const mapId = response.data.CharacterId;
        this.setState({ mapId });
      })
  }

  render() {
    const { loaded } = this.state;
    // Allow the page to load if it is pulling in map data
    const mapId = this.props.match.params.mapId;
    if (typeof mapId !== 'undefined' && !loaded) {
      return <div className="MapMaker"></div>
    }

    return (
      <div className="MapMaker">
        <SiteNavBar enableSave save={this.saveMap}/>
        <h1 className="map-header">Map Maker</h1>
        <MapEditor map={this.state.map} editTile={this.editTile} updateInfo={this.updateInfo}/>
      </div>
    );
  }
}

export default MapMaker;