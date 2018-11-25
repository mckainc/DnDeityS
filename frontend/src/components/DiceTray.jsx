import React, { Component } from 'react';
import Draggable from 'react-draggable';
//images wooooo

class DiceTray extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
    }
  }

  render() {
    
    return (
      <div>
        <Draggable>
          <h1>please drag</h1>
        </Draggable>
      </div>
    );
  }
}

export default DiceTray;