import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// types
import serverURL from '../../objects/url.js';
import { Map } from 'immutable';

// components
import { Row, Col, ProgressBar, Media } from 'react-bootstrap';

class CharacterSheetHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character_id: props.id,
      character: {},
      loaded: false
    }
  }

  componentWillMount() {
    const server = axios.create({
      baseURL: serverURL,
    });

    const { character_id } = this.state;

    server.get('/character/' + character_id)
      .then(response => {
        const character = {};
        character.race = response.data[2];
        character.class = response.data[3];
        character.name = response.data[4];
        character.hp = response.data[6];
        character.max_hp = response.data[7];
        character.avatar = response.data[15];

        const description = JSON.parse(response.data[14]);
        character.level = description.level;
        character.background = description.background;
        character.alignment = description.alignment;

        this.setState({ character, loaded: true });
      });

  }

  render() {
    const { character, loaded } = this.state;
    const percent_hp = character.hp * 100 / character.max_hp;

    if (!loaded) {
      return <div className="CharacterSheetHeader"></div>;
    }
    const src = require("../../textures/avatars/" + character.avatar);

    return (
      <div className="CharacterSheetHeader">
        <Media>
          <Media.Left align="middle">
            <img width={128} height={128} src={src} alt={src}/>
          </Media.Left>
          <Media.Body>
            <Row>
              <Col xs={4} md={1}>
                <small>Level</small>
                <h4>{ character.level }</h4>
              </Col>
              <Col xs={4} md={2}>
                <small>Name</small>
                <h4>{ character.name }</h4>
              </Col>
              <Col xs={4} md={2}>
                <small>Class</small>
                <h4>{ character.class }</h4>
              </Col>
              <Col xs={4} md={2}>
                <small>Race</small>
                <h4>{ character.race }</h4>
              </Col>
              <Col xs={4} md={2}>
                <small>Background</small>
                <h4>{ character.background }</h4>
              </Col>
              <Col xs={4} md={2}>
                <small>Alignment</small>
                <h4>{ character.alignment }</h4>
              </Col>
            </Row>
          </Media.Body>
        </Media>
        <Row>
          <h5>HP: { character.hp } / { character.max_hp }</h5>
          {percent_hp > 50 ? (
              <ProgressBar bsStyle="success" min={0} max={character.max_hp} now={character.hp}/>
            ) : (
            percent_hp > 20 ? (
              <ProgressBar bsStyle="warning" min={0} max={character.max_hp} now={character.hp}/>
            ) : (
              <ProgressBar bsStyle="danger" min={0} max={character.max_hp} now={character.hp}/>
            )
          )}
        </Row>
      </div>
    );
  }
}

export default CharacterSheetHeader;
