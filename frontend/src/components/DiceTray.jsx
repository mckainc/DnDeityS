

import React, { Component } from 'react';
import { Modal, Button,  } from 'react-bootstrap';
import Draggable from 'react-draggable';
//images wooooo

class DiceTray extends Component {
  constructor(props) {
    super(props);

    this.handleShowP1 = this.handleShowP1.bind(this);
    this.handleCloseP1 = this.handleCloseP1.bind(this);

    this.state = {
      showP1: false,
    }
  }

  handleShowP1() {
    this.setState({ showP1: true});
}

handleCloseP1() {
    this.setState({ showP1: false});
}

  render() {
    
    return (
      <div>
        <Button bsSize="xsmall" onClick={this.handleShowP1}>
         Dice
        </Button>

        <Draggable>
          <Modal show={this.state.showP1} onHide={this.handleCloseP1}>
            <Modal.Body>
                <Button>D4</Button>
                <Button>D6</Button>
                <Button>D8</Button>
                <Button>D10</Button>
                <Button>D12</Button>
                <Button>D20</Button>
            </Modal.Body>
          </Modal>
        </Draggable>
      </div>
    );
  }
}

export default DiceTray;