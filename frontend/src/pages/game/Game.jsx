import React, { Component } from 'react';

// types
import { Map } from 'immutable';

// components
import MapGrid from '../../pages/map-maker/MapGrid';
import GameToolbar from './GameToolbar';
import { Col } from 'react-bootstrap';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: new Map(),
    }
  }

  render() {
    return (
      <div className="Game">
        <GameToolbar />
        <Col md={10}>
          <MapGrid x={25} y={25} map={this.state.map} playing={true} />
        </Col>
        <Col md={2}>
          Character Component
        </Col>
      </div>
    )
  }
}

export default Game;