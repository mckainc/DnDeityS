import React, { Component } from 'react';

// components
import SiteNavBar from '../../components/SiteNavBar';
import MapEditor from './MapEditor';

import './MapMaker.css';

class MapMaker extends Component {
  render() {
    return (
      <div className="MapMaker">
        <SiteNavBar enableSave />
        <h1 className="map-header">Map Maker</h1>
        <MapEditor />
      </div>
    );
  }
}

export default MapMaker;