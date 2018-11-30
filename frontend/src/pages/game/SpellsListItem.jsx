import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// types
import serverURL from '../../objects/url.js';
import { Map } from 'immutable';

// components
import { Row, Col, ListGroupItem, Modal, Button } from 'react-bootstrap';

class SpellsListItem extends Component {
  constructor(props) {
    super(props);
    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalHide = this.handleModalHide.bind(this);

    this.state = {
      spell: props.spell,
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
    const { spell, modal } = this.state;

    let info;
    if (spell.type === 'weapon') {
      info = (
        <div>
          <h4>{spell.range + ' Weapon'}</h4>
          <br/>
          <h5>Does...</h5>
          <h4>{spell.damage}</h4>
        </div>
      );
    }
    else if (spell.type === 'armor') {
      info = (
        <div>
          <h4>{spell.category} Armor</h4>
          <br/>
          <h5>Armor Class...</h5>
          <h4>{spell.armor_class}</h4>
        </div>
      );
    }
    else {
      info = (
        <p>{spell.description}</p>
      );
    }

    return (
      <div className="Spells">
        <ListGroupItem>
          {spell.name}
          <Button bsSize="small" className="pull-right" onClick={this.handleModalShow}>Details</Button>
        </ListGroupItem>

        <Modal show={modal} onHide={this.handleModalHide}>
          <Modal.Header closeButton>
            {spell.name}
          </Modal.Header>
          <Modal.Body>
            <h4>Level {spell.level} {spell.school} Spell</h4>
            <br/>
            <h5>Range: {spell.range}</h5>
            <h5>Casting Time: {spell.casting_time}</h5>
            <h5>Duration: {spell.duration}</h5>
            <h5>Concentration: {spell.concentration}</h5>
            <h5>Components: {spell.components}</h5>
            <h5>Materials: {spell.material}</h5>
            <br/>
            <p>{spell.description}</p>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default SpellsListItem;
