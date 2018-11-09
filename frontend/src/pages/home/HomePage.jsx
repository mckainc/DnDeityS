import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// components
import SiteNavBar from '../../components/SiteNavBar';

import './HomePage.css';

class HomePage extends Component {
  render() {
    return (
      <div className="HomePage">
        <SiteNavBar/>
        <div className="container home-page-content">
          <h1>DnDeity</h1>
          <br />
          <h2>Home Page</h2>
          <Link to="/CharacterCreator">
            Create a new character!
          </Link>
          <br />
          <Link to="/MapMaker">
            Create a new map!
          </Link>
        </div>
      </div>
    );
  }
}

export default HomePage;
