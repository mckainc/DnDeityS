import React, { Component } from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

// components
import Lobby from './Lobby';
import JoinGame from './JoinGame';
import SiteNavBar from '../../components/SiteNavBar';

import './HomePage.css';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLobbyModal: false,
      showJoinModal: false,
      reCharacter: false,
      reMap: false,
      reMonster: false,
      page: "none",
    }
  }

  toggleLobbyModal = () => {
    this.setState({ showLobbyModal: !this.state.showLobbyModal });
  }

  toggleJoinModal = () => {
    this.setState({ showJoinModal: !this.state.showJoinModal });
      

  }

  handleClick(e){
    this.setState({page: e});
  }

  render() {
    if(this.state.page !== "none"){
      return <Redirect to = {this.state.page}/>
    }
    return (
      <div className="HomePage">
        <SiteNavBar/>
        <div className="home-page-content">
          <h1>DnDeity</h1>
          <br />
          <h2>Home Page</h2>
          <Grid>
            <Row>
            <Col>
            <Button onClick = {() => this.handleClick("/CharacterCreator")}>Character Designer</Button>
          
            <Button onClick = {() => this.handleClick("/MapMaker")}>Map Designer</Button>
             </Col>
            </Row>
            <Row>
            <Col>
            <Button onClick = {this.toggleJoinModal}>Join a Game</Button>
            
            <Button onClick = {this.toggleLobbyModal}>Host a Game</Button>
            </Col>
            </Row>
          </Grid>
          <Lobby showLobbyModal={this.state.showLobbyModal} onClose={this.toggleLobbyModal}/>
          <JoinGame showJoinModal={this.state.showJoinModal} onClose={this.toggleJoinModal}/>
          </div>
        </div>
    );
  }
}

export default HomePage;
