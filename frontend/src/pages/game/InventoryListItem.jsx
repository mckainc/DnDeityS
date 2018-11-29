import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// types
import serverURL from '../../objects/url.js';
import { Map } from 'immutable';

// components
import { Row, Col, ListGroupItem, Modal, Button } from 'react-bootstrap';

class InventoryListItem extends Component {
  constructor(props) {
    super(props);
    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalHide = this.handleModalHide.bind(this);

    this.state = {
      item: props.item,
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
    const { item, modal } = this.state;

    let info;
    if (item.type === 'weapon') {
      info = (
        <div>
          <h4>{item.range + ' Weapon'}</h4>
          <br/>
          <h5>Does...</h5>
          <h4>{item.damage}</h4>
        </div>
      );
    }
    else if (item.type === 'armor') {
      info = (
        <div>
          <h4>{item.category} Armor</h4>
          <br/>
          <h5>Armor Class...</h5>
          <h4>{item.armor_class}</h4>
        </div>
      );
    }
    else {
      info = (
        <p>{item.description}</p>
      );
    }

    return (
      <div className="InventoryListItem">
        <ListGroupItem>
          <Row>
            <Col md={1}>
              {item.name}
            </Col>
            <Col md={1}>
              <Button onClick={this.handleModalShow}>Details</Button>
            </Col>
          </Row>
        </ListGroupItem>

        <Modal show={modal} onHide={this.handleModalHide}>
          <Modal.Header closeButton>
            {item.name}
          </Modal.Header>
          <Modal.Body>
            {info}
            <br/>
            <h5>Cost: {item.cost}</h5>
            <h5>Weight: {item.weight}</h5>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default InventoryListItem;
