import React, { Component } from 'react';

// components
import SiteNavBar from '../../components/SiteNavBar';

import './MapMaker.css';

class MapMaker extends Component {
  render() {
    return (
      <div className="MapMaker">
        <SiteNavBar enableSave saveCharacter={this.saveCharacter}/>
        <h1 className="map-header">Map Maker</h1>
      </div>
    );
  }
}

export default MapMaker;