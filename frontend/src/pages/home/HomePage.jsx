import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// components
import Lobby from './Lobby';
import SiteNavBar from '../../components/SiteNavBar';

import { Button } from 'react-bootstrap';

import './HomePage.css';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLobbyModal: false,
    }
  }

  toggleLobbyModal = () => {
    this.setState({ showLobbyModal: !this.state.showLobbyModal });
  }

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
          <br />
          <Button onClick={this.toggleLobbyModal}>Create a Lobby</Button>
          <Lobby showLobbyModal={this.state.showLobbyModal} onClose={this.toggleLobbyModal}/>
        </div>
      </div>
    );
  }
}

export default HomePage;
