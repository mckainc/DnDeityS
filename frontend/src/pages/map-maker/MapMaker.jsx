import React, { Component } from 'react';

import { OrderedMap } from 'immutable';

// components
import SiteNavBar from '../../components/SiteNavBar';
import MapEditor from './MapEditor';

import './MapMaker.css';

class MapMaker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: new OrderedMap(),
    }
  }

  editTile = (x, y, type, data) => {
    const { map } = this.state;
    let newMap = map;
    if (!newMap.has(x)) {
      newMap = newMap.set(x, new OrderedMap());
    }
    let tile = {};
    if (newMap.get(x).has(y)) {
      tile = newMap.get(x).get(y);
    }
    tile[type] = data;
    console.log(tile);
    newMap = newMap.set(x, newMap.get(x).set(y, tile));

    this.setState({ map: newMap });
  }

  saveMap = () => {
    const { map } = this.state;
  }

  render() {
    return (
      <div className="MapMaker">
        <SiteNavBar enableSave save={this.saveMap}/>
        <h1 className="map-header">Map Maker</h1>
        <MapEditor map={this.state.map} editTile={this.editTile}/>
      </div>
    );
  }
}

export default MapMaker;