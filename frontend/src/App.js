import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

// components
import CharacterCreator from './pages/character-creator/CharacterCreator';
import CharacterList from './pages/character-list/CharacterList';
import MapList from './pages/map-list/MapList';
import Login from './pages/login-package/Login';
import HomePage from './pages/home/HomePage'
import NewUser from './pages/login-package/NewUser';
import ForgottenPassword from './pages/login-package/ForgottenPassword';
import ChangePassword from './pages/login-package/ChangePassword';
import MapMaker from './pages/map-maker/MapMaker';
import Game from './pages/game/Game';
import MonsterMaker from './pages/monster-maker/MonsterMaker';

class App extends Component {
  render() {
    return (
      //add more routes as pages are added
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/Home" component={HomePage} />
          <Route exact path="/CharacterCreator" component={CharacterCreator} />
          <Route path="/CharacterCreator/:characterId" component={CharacterCreator} />
          <Route exact path="/CharacterList" component={CharacterList} />
          <Route exact path="/MapList" component={MapList} />
          <Route exact path="/NewUser" component={NewUser} />
          <Route exact path="/ForgottenPassword" component={ForgottenPassword} />
          <Route path="/ChangePassword/:user" component={ChangePassword} />
          <Route exact path="/MapMaker" component={MapMaker} />
          <Route path="/MapMaker/:mapId" component={MapMaker} />
          <Route path="/Game" component={Game} />
          <Route exact path="/MonsterMaker" component={MonsterMaker} />
          <Route path="/MonsterMaker/:monsterId" component={MonsterMaker} />
        </div>
      </Router>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
