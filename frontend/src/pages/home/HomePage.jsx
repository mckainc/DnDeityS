import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';

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
          <Button onClick = {() => this.handleClick("/CharacterCreator")}>Create a new character!</Button>
          <br />
          <Button onClick = {() => this.handleClick("/MapMaker")}>Create a new map!</Button>
        </div>
      </div>
    );
  }
}

export default HomePage;
