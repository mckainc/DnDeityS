import React, { Component } from 'react';

// components
import { Button, Panel } from 'react-bootstrap';

import './LayerToolbar.css';

class LayerToolbar extends Component {
  render() {
    const { changeLayer, selectedLayer } = this.props;
    return (
      <div className="LayerToolbar">
        <Panel>
          <Panel.Body>
            <Button onClick={() => changeLayer('tiles')} active={selectedLayer === 'tiles'}>
              <i className="fas fa-gavel" /> Tiles
            </Button>
            <Button onClick={() => changeLayer('monsters')} active={selectedLayer === 'monsters'}>
              <i className="fas fa-skull" /> Monsters
            </Button>
            <Button onClick={() => changeLayer('events')} active={selectedLayer === 'events'}>
              <i className="fas fa-exclamation" /> Events
            </Button>
            <Button className="settings" onClick={this.props.toggleModal}><i className="fas fa-cog" /> Settings</Button>
          </Panel.Body>
        </Panel>
      </div>
    )
  }
}

export default LayerToolbar;