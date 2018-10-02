import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

// components
import CharacterCreator from './pages/character-creator/CharacterCreator';
import Login from './pages/login-package/Login';
import HomePage from './pages/home/HomePage'
import NewUser from './pages/login-package/NewUser';

class App extends Component {
  render() {
    return (
      //add more routes as pages are added
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/Home" component={HomePage} />
          <Route exact path="/CharacterCreater" component={CharacterCreator} />
          <Route exact path="/NewUser" component={NewUser} />
        </div>
      </Router>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
