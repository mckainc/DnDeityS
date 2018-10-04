import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class HomePage extends Component {
  render() {
    return (
      <div className="HomePage">
        <h1>Home Page</h1>
        <br />
        <h1>DnDeity</h1>
        <Link to="/CharacterCreator">
          Character Creator
        </Link>
      </div>
    );
  }
}

export default HomePage;
