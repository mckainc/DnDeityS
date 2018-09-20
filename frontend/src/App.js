import React, { Component } from 'react';
import logo from './logo.svg';

import CollapsableSection from './components/CollapsableSection';
import { Button } from 'react-bootstrap'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <CollapsableSection title="Title" open={true}>
          <Button>Test</Button>
        </CollapsableSection>
        <h2>end</h2>
      </div>
    );
  }
}

export default App;
