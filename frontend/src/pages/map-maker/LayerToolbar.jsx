import React, { Component } from 'react';

// components
import { Button, Panel } from 'react-bootstrap';

class LayerToolbar extends Component {
  render() {
    const { changeLayer, selectedLayer } = this.props;
    return (
      <div className="LayerToolbar">
        <Panel>
          <Button onClick={() => changeLayer('tiles')} active={selectedLayer === 'tiles'}>
            <i className="fas fa-gavel" /> Tiles
          </Button>
          <Button onClick={() => changeLayer('enemies')} active={selectedLayer === 'enemies'}>
            <i className="fas fa-skull" /> Enemies
          </Button>
          <Button onClick={() => changeLayer('events')} active={selectedLayer === 'events'}>
            <i className="fas fa-exclamation" /> Events
          </Button>
          <Button><i className="fas fa-cog" /> Settings</Button>
        </Panel>
      </div>
    )
  }
}

export default LayerToolbar;