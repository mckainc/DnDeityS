import React, { Component } from 'react';

// components
import { Button, Panel } from 'react-bootstrap';

import './IconToolbar.css';

class IconToolbar extends Component {
  render() {
    return (
      <div className="IconToolbar">
        <Panel>
          <h4>Tools</h4>
          <Button ><i className="fas fa-pencil-alt" /></Button>
          <br/>
          <Button ><i className="fas fa-eraser" /></Button>
          <br/>
          <Button ><i className="fas fa-edit" /></Button>
        </Panel>
      </div>
    )
  }
}

export default IconToolbar;