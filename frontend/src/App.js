import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

// components
import CharacterCreator from './pages/character-creator/CharacterCreator';
import Login from './pages/login-package/Login';
import HomePage from './pages/home/HomePage'

class App extends Component {
  render() {
    return (
      //add more routes as pages are added
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Login} />
          <Route exact path="/characterCreater" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
