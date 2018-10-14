import React, { Component } from 'react';

// components
import { Button } from 'react-bootstrap';

class IconToolbar extends Component {
  render() {
    return (
      <div className="IconToolbar">
        <Button ><i className="fas fa-pencil-alt" /></Button>
        <br/>
        <Button ><i className="fas fa-eraser" /></Button>
        <br/>
        <Button ><i className="fas fa-edit" /></Button>
      </div>
    )
  }
}

export default IconToolbar;