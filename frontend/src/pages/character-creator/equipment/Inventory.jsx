import React, { Component } from 'react';

// components
import { Well } from 'react-bootstrap';

class Inventory extends Component {
  render() {
    return (
      <div>
        <Well>
          Drag Items here
        </Well>
      </div>
    );
  }
}

export default Inventory;