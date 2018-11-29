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
    server.get('/equipment')
      .then((response) => {
        response.data.forEach(payload => {
          const item = new RaceType(payload[1], payload[2]);
          // console.log(JSON.stringify(payload));
          // equipment = equipment.set(payload[1], JSON.parse(payload[2]));
          equipment = equipment.set(item.name, item);
        });
    }).then(result => {
      var spells = new Map();
      server.get('/spells')
        .then((response) => {
          response.data.forEach(payload => {
            const spell = new RaceType(payload[1], payload[2]);
            spells = spells.set(spells.name, spell);
          });
      });
    }).then(result => {
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
        character.spells = JSON.parse(response.data[13]);
        
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
                <ListGroupItem header="Equipment" />
                {character.inventory.map(item => (
                  <InventoryListItem item={item}/>
                ))}
              </ListGroup>
            </div>
          </Tab>
          <Tab eventKey={3} title="Spells">
            Tab 3 content
          </Tab>
        </Tabs>;
      </div>
    );
  }
}

export default CharacterSheetSidebar;
