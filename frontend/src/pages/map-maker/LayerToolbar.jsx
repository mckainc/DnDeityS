import React, { Component } from 'react';

// components
import { Button, Panel } from 'react-bootstrap';

class LayerToolbar extends Component {
  render() {
    return (
      <div className="LayerToolbar">
        <Panel>
          <Button><i className="fas fa-gavel" /> Tiles</Button>
          <Button><i className="fas fa-skull" /> Enemies</Button>
          <Button><i className="fas fa-exclamation" /> Events</Button>
          <Button><i className="fas fa-cog" /> Settings</Button>
        </Panel>
      </div>
    )
  }
}

export default LayerToolbar;