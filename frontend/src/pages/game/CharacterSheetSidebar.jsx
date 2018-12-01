import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// types
import serverURL from '../../objects/url.js';
import { Map } from 'immutable';
import RaceType from '../../objects/RaceType';

// components
import { Button, Row, Col, ProgressBar, Media, Tabs, Tab, Panel, ListGroup, ListGroupItem, FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import InventoryListItem from './InventoryListItem';
import SpellsListItem from './SpellsListItem';

class CharacterSheetSidebar extends Component {
  constructor(props) {
    super(props);

    this.handleACClick = this.handleACClick.bind(this);
    this.handleACChange = this.handleACChange.bind(this);

    this.state = {
      dmMode: props.dmMode,
      character_id: props.id,
      character: this.props.character,
      loaded: false,
    }
  }

  componentWillMount() {
    const server = axios.create({
      baseURL: serverURL,
    });

    const { character_id } = this.state;

    var equipment = new Map();
    var spells = new Map();
    var classes = new Map();
    var races = new Map();
    server.get('/equipment')
      .then((response) => {
        response.data.forEach(payload => {
          const item = new RaceType(payload[1], payload[2]);
          // console.log(JSON.stringify(payload));
          // equipment = equipment.set(payload[1], JSON.parse(payload[2]));
          equipment = equipment.set(item.name, item);
        });
    }).then(result => {
      server.get('/spells')
        .then((response) => {
          response.data.forEach(payload => {
            const sp = new RaceType(payload[1], payload[2]);
            // console.log(sp);
            spells = spells.set(sp.name, sp);
          });
    }).then(result => {
      server.get('/classes')
        .then((response) => {
          response.data.forEach(payload => {
            const c = new RaceType(payload[1], payload[2]);
            // console.log(sp);
            classes = classes.set(c.name, c);
          });
    }).then(result => {
      server.get('/races')
        .then((response) => {
          response.data.forEach(payload => {
            const race = new RaceType(payload[1], payload[2]);
            // console.log(sp);
            races = races.set(race.name, race);
          });
    }).then(result => {
      server.get('/character/' + character_id)
      .then(response => {
        const character = {};
        let passed_character = {};
        if (typeof this.props.characters !== 'undefined') {
          this.props.characters.map((value, key) => {
            if (value.character === response.data[4]) {
              passed_character = value;
            }
          });
        }
        character.name = response.data[4];

        if (this.state.dmMode) {
          character.description = "level " + JSON.parse(response.data[14]).level + " " + response.data[2] + " " + response.data[3];
          if (typeof passed_character.hp !== 'undefined') {
            character.hp = passed_character.hp;
          }
          else {
            character.hp = response.data[6];
          }
          character.maxHp = response.data[7];
        }

        let a_scores;
        if (JSON.parse(response.data[8]) === null) {
          a_scores = ['8', '8', '8', '8', '8', '8'];
        }
        else {
          a_scores = JSON.parse(response.data[8]);
        }
        let s_bonuses;
        if (typeof races.get(response.data[2]) !== 'undefined') {
          s_bonuses = races.get(response.data[2]).description.ability_bonuses;
        }
        if (s_bonuses === null) {
          s_bonuses = [0, 0, 0, 0, 0, 0];
        }
        for (let i = 0; i < 6; i++) {
          a_scores[i] = '' + (Number(a_scores[i]) + s_bonuses[i]);
        }
        let ability_modifiers = [];
        for (let i = 0; i < 6; i++) {
          ability_modifiers.push(Math.floor((Number(a_scores[i]) - 10) / 2));
        }
        character.ability_scores = a_scores;
        character.ability_modifiers = ability_modifiers;
        if (typeof passed_character.armor_class !== 'undefined') {
          character.armor_class = passed_character.armor_class;
        }
        else {
          character.armor_class = 10 + Math.floor((Number(a_scores[1]) - 10) / 2);
        }

        let inventory = [];
        JSON.parse(response.data[10]).forEach(item => {
          let data = {};
          data.name = item.name;
          if (typeof equipment.get(item.name) !== 'undefined') {
            let temp = equipment.get(item.name).description;

            // console.log(item.name);
            data.cost = '' + temp.cost.quantity + temp.cost.unit;
            data.weight = '' + temp.weight;
            if (temp.equipment_category === 'Weapon') {
              data.type = 'weapon';
              data.range = temp.weapon_range;
              data.category = temp.weapon_category;
              if (typeof temp['2h_damage'] !== 'undefined') {
                data.two_handed = temp['2h_damage'].dice_count + ' d' + temp['2h_damage'].dice_value + ' ' + temp['2h_damage'].damage_type.name + ' damage';
              }
              data.damage = temp.damage.dice_count + ' d' + temp.damage.dice_value + ' ' + temp.damage.damage_type.name + ' damage';
            }
            else if (temp.equipment_category === 'Armor') {
              data.type = 'armor';
              data.armor_class = temp.armor_class.base + ' (' + (temp.armor_class.max_bonus === null ? 'no max bonus)' : 'max bonus: ' + temp.armor_class.max_bonus + ')');
              data.category = temp.armor_category;
            }
            else {
              data.type = 'else';
              if (typeof temp.desc !== 'undefined') {
                data.description = temp.desc[0];
              }
            }
            inventory.push(data);
          }
        });
        // character.inventory = JSON.parse(response.data[10]);
        character.inventory = inventory;

        let known_spells = [];
        JSON.parse(response.data[13]).forEach(spell => {
          let data = {};
          data.name = spell.name;
          if (typeof spells.get(spell.name) !== 'undefined') {
            let temp = spells.get(spell.name).description;
            data.level = temp.level;
            data.range = temp.range;
            data.school = temp.school.name;
            if (typeof temp.material !== 'undefined') {
              data.material = temp.material;
            }
            else {
              data.material = 'None';
            }
            data.casting_time = temp.casting_time;
            data.duration = temp.duration;
            data.concentration = temp.concentration;
            if (typeof temp.higher_level !== 'undefined') {
              data.description = temp.desc[0] + ' ' + temp.higher_level[0];
            }
            else {
              data.description = temp.desc[0];
            }
            let components = '';
            if (temp.components.includes('V')) {
              components += 'Verbal, ';
            }
            if (temp.components.includes('S')) {
              components += 'Somatic, ';
            }
            if (temp.components.includes('M')) {
              components += 'Material, ';
            }
            components = components.slice(0, -2);
            data.components = components;
            known_spells.push(data);
          }
        });
        character.spells = known_spells;
        // character.spells = JSON.parse(response.data[13]);
        
        const description = JSON.parse(response.data[14]);
        const choices = JSON.parse(response.data[11]);
        let languages = '';
        // languages.push(choices.race.language);
        // languages.push(description.background_language1);
        // languages.push(description.background_language2);
        if (choices.race.language !== "") {
          languages += choices.race.language + ', ';
        }
        if (description.background_language1 !== "") {
          languages += description.background_language1 + ', ';
        }
        if (description.background_language2 !== "") {
          languages += description.background_language2 + ', ';
        }
        if (typeof races.get(response.data[2]) !== 'undefined') {
          let temp = races.get(response.data[2]).description;
          temp.languages.forEach(language => {
            languages += language.name + ', ';
          });
        }
        character.languages = languages.slice(0, -2);

        let proficiencies = [];
        let skills = [];
        if (choices.race.proficiency !== "") {
          proficiencies.push(choices.race.proficiency);
        }
        choices.class.forEach(proficiency => {
          if (typeof proficiency === 'object') {
            proficiency.forEach(function(skill) {
              skills.push(skill);
            });
          }
          else if (proficiency !== "") {
            proficiencies.push(proficiency);
          }
        });
        if (typeof races.get(response.data[2]) !== 'undefined') {
          let temp = races.get(response.data[2]).description;
          temp.starting_proficiencies.forEach(proficiency => {
            if (proficiency.name.startsWith('Skill: ')) {
              skills.push(proficiency.name);
            }
            else {
              proficiencies.push(proficiency.name);
            }
          });
        }
        if (typeof classes.get(response.data[3]) !== 'undefined') {
          let saving_throws = [];
          let temp = classes.get(response.data[3]).description;
          temp.proficiencies.forEach(proficiency => {
            if (proficiency.name.startsWith('Skill: ')) {
              skills.push(proficiency.name);
            }
            else {
              proficiencies.push(proficiency.name);
            }
          });
          temp.saving_throws.forEach(s_throw => {
            saving_throws.push(s_throw.name);
          });
          character.saving_throws = saving_throws;
        }
        let str_skills = [];
        let dex_skills = [];
        let int_skills = [];
        let wis_skills = [];
        let chr_skills = [];
        character.perception = false;
        skills.forEach(skill => {
          if (skill === 'Skill: Perception') {
            character.perception = true;
          }
          else if (skill === 'Skill: Athletics') {
            str_skills.push(skill);
          }
          else if (skill === 'Skill: Acrobatics' || skill === 'Skill: Sleight of Hand' || skill === 'Skill: Stealth') {
            dex_skills.push(skill);
          }
          else if (skill === 'Skill: Deception' || skill === 'Skill: Intimidation' || skill === 'Skill: Performance' || skill === 'Skill: Persuasion') {
            chr_skills.push(skill);
          }
          else if (skill === 'Skill: Arcana' || skill === 'Skill: History' || skill === 'Skill: Investigation' || skill === 'Skill: Nature' || skill === 'Skill: Religion') {
            int_skills.push(skill);
          }
          else {
            wis_skills.push(skill);
          }
        });
        character.str_skills = str_skills;
        character.dex_skills = dex_skills;
        character.int_skills = int_skills;
        character.wis_skills = wis_skills;
        character.chr_skills = chr_skills;
        character.proficiencies = proficiencies.join(', ');

        let traits = '';
        if (typeof races.get(response.data[2]) !== 'undefined') {
          let temp = races.get(response.data[2]).description;
          character.speed = temp.speed;
          character.size = temp.size;
          temp.traits.forEach(trait => {
            traits += trait.name + ', ';
          });
        }
        character.traits = traits.slice(0, -2);

        console.log(character);

        this.setState({ character, loaded: true });
      });
      });
      });
      });
    });
  }

  handleACClick() {
    const { character, ACForm } = this.state;
    character.armor_class = ACForm;
    console.log("change AC to " + ACForm);

    let name = character.name;

    const server = axios.create({
      baseURL: serverURL,
    });

    const json = {
      channel: sessionStorage.getItem('channel'),
      event: 'change-character',
      message: {
        name,
        character,
      }
    }

    server.post('/pushmessage', JSON.stringify(json));
    this.setState({character});
  }

  handleACChange = event => {
    this.setState({ACForm: event.target.value});
  }

  componentWillReceiveProps(next_props) {
    if (next_props.id != this.props.id) {
      this.setState({character_id: next_props.id}, function() {
        this.componentWillMount();
      });
    }
  }

  render() {
    const { character, loaded } = this.state;

    if (!loaded) {
      return <div className="CharacterSheetSidebar"></div>;
    }

    let str_foot;
    if (character.str_skills.length > 0) {
      str_foot = (
        <Panel.Footer>
          <small>Athletics</small>
        </Panel.Footer>
      );
    }

    let dex_foot;
    if (character.dex_skills.length > 0) {
      dex_foot = (
        <Panel.Footer>
          {character.dex_skills.map(skill => (
            <div><small>{skill.slice(7)}</small><br/></div>
          ))}
        </Panel.Footer>
      );
    }

    let int_foot;
    if (character.int_skills.length > 0) {
      int_foot = (
        <Panel.Footer>
          {character.int_skills.map(skill => (
            <div><small>{skill.slice(7)}</small><br/></div>
          ))}
        </Panel.Footer>
      );
    }

    let wis_foot;
    if (character.wis_skills.length > 0) {
      wis_foot = (
        <Panel.Footer>
          {character.wis_skills.map(skill => (
            <div><small>{skill.slice(7)}</small><br/></div>
          ))}
        </Panel.Footer>
      );
    }

    let chr_foot;
    if (character.chr_skills.length > 0) {
      chr_foot = (
        <Panel.Footer>
          {character.chr_skills.map(skill => (
            <div><small>{skill.slice(7)}</small><br/></div>
          ))}
        </Panel.Footer>
      );
    }

    return (
      <div className="CharacterSheetSidebar">
        {this.state.dmMode && <div><h4>{character.name}</h4><h4>{character.description}</h4><h5>HP: {character.hp + '/' + character.maxHp}</h5></div>}
        <Tabs defaultActiveKey={1} id="character-sidebar-tab">
          <Tab eventKey={1} title="Ability Scores">
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Armor Class</Panel.Title>
              </Panel.Heading>
              <Panel.Body>{character.armor_class}</Panel.Body>
              {!this.state.dmMode ? (
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
              ) : (<div/>)}
            </Panel>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Strength {character.saving_throws.includes('STR') ? " (Saving Throw)" : ""}</Panel.Title>
              </Panel.Heading>
              <Panel.Body>{character.ability_scores[0] + " (" + (character.ability_modifiers[0] > 0 ? "+" : "") + character.ability_modifiers[0] + ")"}</Panel.Body>
              {str_foot}
            </Panel>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Dexterity {character.saving_throws.includes('DEX') ? " (Saving Throw)" : ""}</Panel.Title>
              </Panel.Heading>
              <Panel.Body>{character.ability_scores[1] + " (" + (character.ability_modifiers[1] > 0 ? "+" : "") + character.ability_modifiers[1] + ")"}</Panel.Body>
              {dex_foot}
            </Panel>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Constitution {character.saving_throws.includes('CON') ? " (Saving Throw)" : ""}</Panel.Title>
              </Panel.Heading>
              <Panel.Body>{character.ability_scores[2] + " (" + (character.ability_modifiers[2] > 0 ? "+" : "") + character.ability_modifiers[2] + ")"}</Panel.Body>
            </Panel>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Intelligence {character.saving_throws.includes('INT') ? " (Saving Throw)" : ""}</Panel.Title>
              </Panel.Heading>
              <Panel.Body>{character.ability_scores[3] + " (" + (character.ability_modifiers[3] > 0 ? "+" : "") + character.ability_modifiers[3] + ")"}</Panel.Body>
              {int_foot}
            </Panel>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Wisdom {character.saving_throws.includes('WIS') ? " (Saving Throw)" : ""}</Panel.Title>
              </Panel.Heading>
              <Panel.Body>{character.ability_scores[4] + " (" + (character.ability_modifiers[4] > 0 ? "+" : "") + character.ability_modifiers[4] + ")"}</Panel.Body>
              {wis_foot}
            </Panel>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Charisma {character.saving_throws.includes('CHA') ? " (Saving Throw)" : ""}</Panel.Title>
              </Panel.Heading>
              <Panel.Body>{character.ability_scores[5] + " (" + (character.ability_modifiers[5] > 0 ? "+" : "") + character.ability_modifiers[5] + ")"}</Panel.Body>
              {chr_foot}
            </Panel>
          </Tab>
          <Tab eventKey={2} title="Inventory">
            <div className="scrollable-list">
              <ListGroup>
                {character.inventory.map(item => (
                  <InventoryListItem item={item}/>
                ))}
              </ListGroup>
            </div>
          </Tab>
          <Tab eventKey={3} title="Spells">
            <div className="scrollable-list">
              <ListGroup>
                {character.spells.map(spell => (
                  <SpellsListItem spell={spell}/>
                ))}
              </ListGroup>
            </div>
          </Tab>
          <Tab eventKey={4} title="Info">
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Proficiencies</Panel.Title>
              </Panel.Heading>
              <Panel.Body>{character.proficiencies}</Panel.Body>
            </Panel>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Traits</Panel.Title>
              </Panel.Heading>
              <Panel.Body>{character.traits}</Panel.Body>
            </Panel>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Stats</Panel.Title>
              </Panel.Heading>
              <Panel.Body>Size: {character.size}<br/>Speed: {character.speed}</Panel.Body>
            </Panel>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Languages</Panel.Title>
              </Panel.Heading>
              <Panel.Body>{character.languages}</Panel.Body>
            </Panel>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default CharacterSheetSidebar;
