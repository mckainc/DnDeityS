import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

// components
import CharacterCreator from './pages/character-creator/CharacterCreator';
import Login from './pages/login-package/Login';
import HomePage from './pages/home/HomePage'
import NewUser from './pages/login-package/NewUser';
import ForgottenPassword from './pages/login-package/ForgottenPassword';
import ChangePassword from './pages/login-package/ChangePassword';

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
          <Route exact path="/ForgottenPassword" component={ForgottenPassword} />
          <Route path="/ChangePassword/:user" component={ChangePassword} />
        </div>
      </Router>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
