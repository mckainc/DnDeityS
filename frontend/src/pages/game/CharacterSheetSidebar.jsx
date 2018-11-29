import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// types
import serverURL from '../../objects/url.js';
import { Map } from 'immutable';
import RaceType from '../../objects/RaceType';

// components
import { Row, Col, ProgressBar, Media, Tabs, Tab, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import InventoryListItem from './InventoryListItem';
import SpellsListItem from './SpellsListItem';

class CharacterSheetSidebar extends Component {
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

    var equipment = new Map();
    var spells = new Map();
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
      })
    .then(result => {
      server.get('/character/' + character_id)
      .then(response => {
        const character = {};

        character.ability_scores = JSON.parse(response.data[8]);
        if (character.ability_scores === null) {
          character.ability_scores = ['8', '8', '8', '8', '8', '8'];
        }
        let inventory = [];
        JSON.parse(response.data[10]).forEach(item => {
          let data = {};
          data.name = item.name;
          if (typeof equipment.get(item.name) !== 'undefined') {
            let temp = equipment.get(item.name).description;

            // console.log(item.name);
            // console.log(temp);
            data.cost = '' + temp.cost.quantity + temp.cost.unit;
            data.weight = '' + temp.weight;
            if (temp.equipment_category === 'Weapon') {
              data.type = 'weapon';
              data.range = temp.weapon_range;
              data.category = temp.weapon_category;
              // if (typeof temp.2h_damage !== 'undefined') {
              //   data.two-handed = temp.2h_damage.dice_count + ' d' + temp.2h_damage.dice_value + ' ' + temp.2h_damage.damage_type.name + ' damage';
              // }
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
          console.log(spell);
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
        let languages = [];
        languages.push(choices.race.language);
        languages.push(description.background_language1);
        languages.push(description.background_language2);
        character.languages = languages;

        let proficiencies = [];
        proficiencies.push(choices.race.proficiency);
        choices.class.forEach(function(proficiency) {
          if (typeof proficiency === 'object') {
            let skills = [];
            proficiency.forEach(function(skill) {
              skills.push(skill);
            });
            character.skills = skills;
          }
          else if (proficiency != "") {
            proficiencies.push(proficiency);
          }
        });
        character.proficiencies = proficiencies;

        console.log(character);

        this.setState({ character, loaded: true });
      });
      });
    });
  }

  render() {
    const { character, loaded } = this.state;

    if (!loaded) {
      return <div className="CharacterSheetSidebar"></div>;
    }

    return (
      <div className="CharacterSheetSidebar">
        <Tabs defaultActiveKey={1} id="character-sidebar-tab">
          <Tab eventKey={1} title="Ability Scores">
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Strength</Panel.Title>
              </Panel.Heading>
              <Panel.Body>{character.ability_scores[0]}</Panel.Body>
            </Panel>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Dexterity</Panel.Title>
              </Panel.Heading>
              <Panel.Body>{character.ability_scores[1]}</Panel.Body>
            </Panel>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Constitution</Panel.Title>
              </Panel.Heading>
              <Panel.Body>{character.ability_scores[2]}</Panel.Body>
            </Panel>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Intelligence</Panel.Title>
              </Panel.Heading>
              <Panel.Body>{character.ability_scores[3]}</Panel.Body>
            </Panel>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Wisdom</Panel.Title>
              </Panel.Heading>
              <Panel.Body>{character.ability_scores[4]}</Panel.Body>
            </Panel>
            <Panel>
              <Panel.Heading>
                <Panel.Title componentClass="h3">Charisma</Panel.Title>
              </Panel.Heading>
              <Panel.Body>{character.ability_scores[5]}</Panel.Body>
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
        </Tabs>;
      </div>
    );
  }
}

export default CharacterSheetSidebar;
