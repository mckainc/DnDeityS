import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// types
import serverURL from '../../objects/url.js';
import { Map } from 'immutable';

// components
import SiteNavBar from '../../components/SiteNavBar';
import MapListItem from './MapListItem';

import './MapList.css';

class MapList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maps: new Map(),
    }
  }

  componentWillMount() {
    const server = axios.create({
      baseURL: serverURL,
    });

    const userId = localStorage.getItem('user_id');
    
    // Get user's maps
    server.get('/maps/' + userId)
      .then(response => {
        let maps = new Map();
        response.data.forEach(payload => {
          const map = {};
          map.id = payload[0];
          map.name = payload[3];
          map.height = payload[4];
          map.width = payload[5];
          maps = maps.set(map.id, map);
        });
        this.setState({ maps });
      });
  }

  deleteMap = (mapId) => {
    const server = axios.create({
      baseURL: serverURL,
    });

    const userId = localStorage.getItem('user_id');

    // Delete Map
    server.delete('/map/' + mapId)
      .then(() => {
        // Get user's maps
        server.get('/maps/' + userId)
        .then(response => {
          let maps = new Map();
          response.data.forEach(payload => {
            const map = {};
            map.id = payload[0];
            map.name = payload[3];
            map.height = payload[4];
            map.width = payload[5];
            maps = maps.set(map.id, map);
          });
          this.setState({ maps });
        });
      })
  }

  render() {
    const { maps } = this.state;
    return (
      <div className="MapList">
        <SiteNavBar/>
        <div className="container">
          <div className="map-list-content">
            <h1>DnDeity</h1>
            <br />
            <h2>Maps</h2>
            <Link to="/MapMaker">
              Create a new Map!
            </Link>
            <h3>Map List</h3>
            {maps.valueSeq().map(map => (
              <MapListItem map={map} deleteMap={this.deleteMap}/>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default MapList;