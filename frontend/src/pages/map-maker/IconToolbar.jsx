import React, { Component } from 'react';

// components
import { Button, Panel } from 'react-bootstrap';

import './IconToolbar.css';

class IconToolbar extends Component {
  render() {
    const { selectedTool } = this.props;
    return (
      <div className="IconToolbar">
        <Panel>
          <h4>Tools</h4>
          <Button onClick={() => this.props.changeTool('draw')} active={selectedTool === 'draw'}>
            <i className="fas fa-pencil-alt" />
          </Button>
          <br/>
          <Button onClick={() => this.props.changeTool('erase')} active={selectedTool === 'erase'}>
            <i className="fas fa-eraser" />
          </Button>
          <br/>
          <Button onClick={() => this.props.changeTool('edit')} active={selectedTool === 'edit'}>
            <i className="fas fa-edit" />
          </Button>
        </Panel>
      </div>
    )
  }
}

export default IconToolbar;