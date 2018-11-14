import React, { Component } from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

// components
import SiteNavBar from '../../components/SiteNavBar';

import './HomePage.css';

class HomePage extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      reCharacter: false,
      reMap: false,
      reMonster: false,
      page: "none",
    }
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
        <div className="container home-page-content">
          <h1>DnDeity</h1>
          <br />
          <h2>Home Page</h2>
          <div className="container home-page-body">
          <Grid>
            <Row>
            <Col>
            <Button onClick = {() => this.handleClick("/CharacterCreator")}>Character Designer</Button>
          
            <Button onClick = {() => this.handleClick("/MapMaker")}>Map Designer</Button>
             </Col>
            </Row>
            <Row>
            <Col>
            <Button onClick = {() => this.handleClick("none")}>Join a Game</Button>
            
            <Button onClick = {() => this.handleClick("none")}>Host a Game</Button>
            </Col>
            </Row>
          </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
