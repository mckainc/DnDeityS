import React, { Component } from 'react';

import { Panel, ProgressBar, Button, Form, FormGroup, ControlLabel, FormControl, Col, Row, Tabs, Tab, ListGroup, ListItem, InputGroup } from 'react-bootstrap';
import MonsterSelector from '../map-maker/MonsterSelector';
import ActionListItem from './ActionListItem';

class InGameMonsterEditor extends Component {
  constructor(props) {
    super(props);

    this.current_monster = undefined;
    this.monsters = new Map();
    this.state = {
      ACForm : '',
      HPForm : '',
    }
  }

  handleChange = e => {
    const { selectedX, selectedY } = this.props;

    let monster = {};
    if (this.props.map.has(selectedX)) {
      monster = this.props.map.get(selectedX).get(selectedY).monster;
      if (typeof monster === 'undefined') monster = {};
    }

    monster[e.target.name] = e.target.value;

    this.props.editTile(selectedX, selectedY, 'monster', monster);
  }

  selectMonster = monster => {
    const event = {};
    event.target = {};
    event.target.name = 'type';
    event.target.value = monster;
    this.handleChange(event);
  }

  deleteMonster = () => {
    const event = {};
    event.target = {};
    event.target.name = 'type';
    event.target.value = '';
    this.handleChange(event);
  }

  getSkills = (monster) => {
    let skills = ['athletics', 'acrobatics', 'slight_of_hand', 'stealth', 'arcana', 'history',
              'investigation', 'nature', 'religion', 'animal_handling', 'insight', 'medicine',
              'perception', 'survival', 'deception', 'intimidation', 'performance', 'persuasion'];

    let returned = [];
    skills.forEach(skill => {
      if (typeof monster[skill] !== 'undefined') {
        returned.push(skill + ' +' + monster[skill]);
      }
    });
    return returned;
  }

  handleACClick = () => {
    const { ACForm } = this.state;
    this.current_monster.armor_class = ACForm;
    this.monsters.set(this.current_monster.name + ', ' + this.current_monster.type, this.current_monster);
    this.forceUpdate();
  }

  handleACChange = event => {
    this.setState({ ACForm: event.target.value });
  }

  handleHPClick = () => {
    const { HPForm } = this.state;
    this.current_monster.hp = HPForm;
    this.monsters.set(this.current_monster.name + ', ' + this.current_monster.type, this.current_monster);
    this.forceUpdate();
  }

  handleHPChange = event => {
    this.setState({ HPForm: event.target.value });
  }

  handleNotesChange = event => {
    this.current_monster.notes = event.target.value;
    this.forceUpdate();
  }

  render() {
    const { selectedX, selectedY, monsters } = this.props;
    const state_monsters = this.monsters;

    let monster = {};
    if (this.props.map.has(selectedX) && this.props.map.get(selectedX).has(selectedY)) {
      monster = this.props.map.get(selectedX).get(selectedY).monster;
      if (typeof monster === 'undefined') monster = {};
      if (typeof monster.name === 'undefined') monster.name = '';
      if (typeof monster.description === 'undefined') monster.description = '';
      if (typeof monster.type === 'undefined') monster.type = '';
    }

    let loaded = false;
    if (typeof monsters.get(monster.type) !== 'undefined') {
      if (typeof state_monsters.get(monster.name + ', ' + monster.type) !== 'undefined') {
        console.log(monster.name + ', ' + monster.type + ' Already loaded');
        monster = state_monsters.get(monster.name + ', ' + monster.type);
      }
      else {
        console.log(monster.name + ', ' + monster.type + ' Not loaded');
        let temp = monsters.get(monster.type).description;
        monster.details = temp.size + " " + temp.type + " (" + temp.subtype + "), " + temp.alignment;
        monster.hp = temp.hit_points;
        monster.max_hp = temp.hit_points;
        monster.languages = temp.languages;
        let ability_scores = [temp.strength, temp.dexterity, temp.constitution, temp.intelligence, temp.wisdom, temp.charisma];
        monster.ability_scores = ability_scores;
        let ability_modifiers = [];
        for (let i = 0; i < 6; i++) {
          ability_modifiers.push(Math.floor((ability_scores[i] - 10) / 2));
        }
        monster.ability_modifiers = ability_modifiers;
        monster.armor_class = temp.armor_class;
        let actions = [];
        temp.actions.forEach(action => {
          let ac = {};
          ac.name = action.name;
          ac.description = action.desc;
          actions.push(ac);
        });
        monster.actions = actions;
        let special_abilities = [];
        temp.special_abilities.forEach(ability => {
          let ab = {};
          ab.name = ability.name;
          ab.description = ability.desc;
          special_abilities.push(ab);
        });
        monster.special_abilities = special_abilities;
        monster.speed = temp.speed;
        if (temp.damage_vulnerabilities !== '') {
          monster.vulnerabilities = temp.damage_vulnerabilities;
        }
        else {
          monster.vulnerabilities = 'None';
        }

        if (temp.condition_immunities !== '' && temp.damage_immunities !== '') {
          monster.immunities = temp.condition_immunities + ', ' + temp.damage_immunities;
        }
        else if (temp.condition_immunities !== '' && temp.damage_immunities === '') {
          monster.immunities = temp.condition_immunities;
        }
        else if (temp.condition_immunities === '' && temp.damage_immunities !== '') {
          monster.immunities = temp.damage_immunities;
        }
        else {
          monster.immunities = 'None';
        }

        if (typeof temp.damage_resistances !== 'undefined' && temp.damage_resistances !== '') {
          monster.resistances = temp.damage_resistances;
        }
        else {
          monster.resistances = 'None';
        }

        monster.rating = temp.challenge_rating;
        monster.skills = this.getSkills(temp);
        monster.notes = '';
        state_monsters.set(monster.name + ', ' + monster.type, monster);
        this.monsters = state_monsters;
      }
      loaded = true;
      this.current_monster = monster;
    }

    if (!loaded) {
      return (
        <div className="InGameMonsterEditor">
          <Panel>
            <Panel.Heading>
              <Panel.Title componentClass="h1">Monster Editor</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <p>No Monster Selected</p>
            </Panel.Body>
          </Panel>
        </div>
      )
    }

    console.log(monster);
    const percent_hp = monster.hp * 100 / monster.max_hp;

    return (
      <div className="InGameMonsterEditor">
        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h1">Monster Editor</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <Row>
              <Col xs={3} md={2}><small>Name</small><h4>{monster.name}</h4></Col>
              <Col xs={3} md={2}><small>Type</small><h4>{monster.type}</h4></Col>
              <Col xs={6} md={8}><small>Details</small><h4>{monster.details}</h4></Col>
            </Row>
            <Row><Col md={12}>
              <h5>HP: { monster.hp } / { monster.max_hp }</h5>
              {percent_hp > 50 ? (
                  <ProgressBar bsStyle="success" min={0} max={monster.max_hp} now={monster.hp}/>
                ) : (
                percent_hp > 20 ? (
                  <ProgressBar bsStyle="warning" min={0} max={monster.max_hp} now={monster.hp}/>
                ) : (
                  <ProgressBar bsStyle="danger" min={0} max={monster.max_hp} now={monster.hp}/>
                )
              )}
              <form>
                <FormGroup>
                  <InputGroup>
                    <FormControl type="text" value={this.state.HPForm} onChange={this.handleHPChange}/>
                    <InputGroup.Button>
                      <Button onClick={this.handleHPClick}>Change Current HP</Button>
                    </InputGroup.Button>
                  </InputGroup>
                </FormGroup>
              </form>
            </Col></Row>
            <Tabs defaultActiveKey={1} id="character-sidebar-tab">
              <Tab eventKey={1} title="Ability Scores">
                <Row><Col xs={4} xsPush={4}>
                  <Panel>
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">Armor Class</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>{monster.armor_class}</Panel.Body>
                    <Panel.Footer>
                      <form>
                        <FormGroup>
                          <InputGroup>
                            <FormControl type="text" value={this.state.ACForm} onChange={this.handleACChange}/>
                            <InputGroup.Button>
                              <Button onClick={this.handleACClick}>Change</Button>
                            </InputGroup.Button>
                          </InputGroup>
                        </FormGroup>
                      </form>
                    </Panel.Footer>
                  </Panel>
                </Col></Row>
                <Row>
                  <Col xs={4}>
                    <Panel>
                      <Panel.Heading>
                        <Panel.Title componentClass="h3">Strength</Panel.Title>
                      </Panel.Heading>
                      <Panel.Body>{monster.ability_scores[0] + " (" + (monster.ability_modifiers[0] > 0 ? "+" : "") + monster.ability_modifiers[0] + ")"}</Panel.Body>
                    </Panel>
                  </Col>
                  <Col xs={4}>
                    <Panel>
                      <Panel.Heading>
                        <Panel.Title componentClass="h3">Dexterity</Panel.Title>
                      </Panel.Heading>
                      <Panel.Body>{monster.ability_scores[1] + " (" + (monster.ability_modifiers[1] > 0 ? "+" : "") + monster.ability_modifiers[1] + ")"}</Panel.Body>
                    </Panel>
                  </Col>
                  <Col xs={4}>
                    <Panel>
                      <Panel.Heading>
                        <Panel.Title componentClass="h3">Constitution</Panel.Title>
                      </Panel.Heading>
                      <Panel.Body>{monster.ability_scores[2] + " (" + (monster.ability_modifiers[2] > 0 ? "+" : "") + monster.ability_modifiers[2] + ")"}</Panel.Body>
                    </Panel>
                  </Col>
                </Row>
                <Row>
                <Col xs={4}>
                  <Panel>
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">Intelligence</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>{monster.ability_scores[3] + " (" + (monster.ability_modifiers[3] > 0 ? "+" : "") + monster.ability_modifiers[3] + ")"}</Panel.Body>
                  </Panel>
                </Col>
                <Col xs={4}>
                  <Panel>
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">Wisdom</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>{monster.ability_scores[4] + " (" + (monster.ability_modifiers[4] > 0 ? "+" : "") + monster.ability_modifiers[4] + ")"}</Panel.Body>
                  </Panel>
                </Col>
                <Col xs={4}>
                  <Panel>
                    <Panel.Heading>
                      <Panel.Title componentClass="h3">Charisma</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>{monster.ability_scores[5] + " (" + (monster.ability_modifiers[5] > 0 ? "+" : "") + monster.ability_modifiers[5] + ")"}</Panel.Body>
                  </Panel>
                </Col>
              </Row>
              </Tab>
              <Tab eventKey={2} title="Actions">
                <div className="scrollable-list">
                  <ListGroup>
                    {monster.actions.map(action => (
                      <ActionListItem action={action}/>
                    ))}
                  </ListGroup>
                </div>
              </Tab>
              <Tab eventKey={3} title="Special Abilities">
                <div className="scrollable-list">
                  <ListGroup>
                    {monster.special_abilities.map(ability => (
                      <ActionListItem action={ability}/>
                    ))}
                  </ListGroup>
                </div>
              </Tab>
              <Tab eventKey={4} title="Info">
                <Row>
                  <Col xs={3}>
                    <Panel>
                      <Panel.Heading>Skills</Panel.Heading>
                      <Panel.Body>{monster.skills.join(', ')}</Panel.Body>
                    </Panel>
                  </Col>
                  <Col xs={2}>
                    <Panel>
                      <Panel.Heading>Attributes</Panel.Heading>
                      <Panel.Body>
                        Immunities: {monster.immunities}<br/>
                        Resistances: {monster.resistances}<br/>
                        Vulnerabilities: {monster.vulnerabilities}
                      </Panel.Body>
                    </Panel>
                  </Col>
                  <Col xs={2}>
                    <Panel>
                      <Panel.Heading>Languages</Panel.Heading>
                      <Panel.Body>
                        {monster.languages}
                      </Panel.Body>
                    </Panel>
                  </Col>
                  <Col xs={2}>
                    <Panel>
                      <Panel.Heading>Stats</Panel.Heading>
                      <Panel.Body>
                        Rating: {monster.rating}<br/>
                        Speed: {monster.speed}
                      </Panel.Body>
                    </Panel>
                  </Col>
                  <Col xs={3}>
                    <Panel>
                      <Panel.Heading>Description</Panel.Heading>
                      <Panel.Body>
                        {monster.description}
                      </Panel.Body>
                    </Panel>
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey={5} title="Notes">
                <form>
                  <FormGroup>
                    <FormControl bsSize="large" type="text" value={this.current_monster.notes} onChange={this.handleNotesChange}/>
                  </FormGroup>
                </form>
              </Tab>
            </Tabs>
          </Panel.Body>
        </Panel>
      </div>
    )
  }
}

export default InGameMonsterEditor;
