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

  componentWillReceiveProps(next_props) {
    if (next_props.spell.name != this.props.spell.name) {
      this.setState({ spell: next_props.spell });
    }
  }

  render() {
    const { spell, modal } = this.state;

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
