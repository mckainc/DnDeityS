import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// types
import serverURL from '../../objects/url.js';
import { Map } from 'immutable';

// components
import { Row, Col, ListGroupItem, Modal, Button } from 'react-bootstrap';

class ActionListItem extends Component {
  constructor(props) {
    super(props);
    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalHide = this.handleModalHide.bind(this);

    this.state = {
      action: props.action,
      modal: false
    }
  }

  handleModalShow() {
    this.setState({modal: true});
  }

  handleModalHide() {
    this.setState({modal: false});
  }

  render() {
    const { action, modal } = this.state;

    return (
      <div className="ActionListItem">
        <ListGroupItem>
          {action.name}
          <Button bsSize="small" className="pull-right" onClick={this.handleModalShow}>Details</Button>
        </ListGroupItem>

        <Modal show={modal} onHide={this.handleModalHide}>
          <Modal.Header closeButton>
            {action.name}
          </Modal.Header>
          <Modal.Body>
            <p>{action.description}</p>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ActionListItem;
