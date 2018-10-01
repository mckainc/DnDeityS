import React, { Component } from 'react';

// types
import RaceType from '../../../objects/RaceType';

// components
import EquipmentListItem from './EquipmentListItem';

import { Well, ListGroup } from 'react-bootstrap';

const itemNames = ['Club', 'Leatherworker\'s tools', 'Antitoxin', 'Arrow', 'Barding']

const itemJSONs = [
  `{
    "_id": "5a52bca1559f00418e53355b",
    "index": 1,
    "name": "Club",
    "equipment_category": "Weapon",
    "weapon_category:": "Simple",
    "weapon_range": "Melee",
    "category_range": "Simple Melee",
    "cost": {
      "quantity": 1,
      "unit": "sp"
    },
    "damage": {
      "dice_count": 1,
      "dice_value": 4,
      "damage_type": {
        "url": "http://www.dnd5eapi.co/api/damage-types/2",
        "name": "Bludgeoning"
      }
    },
    "range": {
      "normal": 5,
      "long": null
    },
    "weight": 2,
    "properties": [
      {
        "name": "Light",
        "url": "http://www.dnd5eapi.co/api/weapon-properties/4"
      },
      {
        "name": "Monk",
        "url": "http://www.dnd5eapi.co/api/weapon-properties/11"
      }
    ],
    "url": "http://www.dnd5eapi.co/api/equipment/1"
  }`,
  `{
    "_id": "5a52bca1559f00418e533602",
    "index": 170,
    "name": "Leatherworker’s tools",
    "equipment_category": "Tools",
    "tool_category": "Artisan's Tools",
    "cost": {
      "quantity": 5,
      "unit": "gp"
    },
    "weight": 5,
    "desc": [
      "These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan’s tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan’s tools requires a separate proficiency."
    ],
    "url": "http://www.dnd5eapi.co/api/equipment/170"
  }`,
  `{
    "_id": "5a52bca1559f00418e533592",
    "index": 59,
    "name": "Antitoxin (vial)",
    "equipment_category": "Adventuring Gear",
    "gear_category": "Standard Gear",
    "cost": {
      "quantity": 50,
      "unit": "gp"
    },
    "weight": 0,
    "desc": [
      "A creature that drinks this vial of liquid gains advantage on saving throws against poison for 1 hour. It confers no benefit to undead or constructs."
    ],
    "url": "http://www.dnd5eapi.co/api/equipment/59"
  }`,
  `{
    "_id": "5a52bca1559f00418e53358e",
    "index": 54,
    "name": "Arrow",
    "equipment_category": "Adventuring Gear",
    "gear_category": "Ammunition",
    "cost": {
      "quantity": 5,
      "unit": "cp"
    },
    "weight": 1,
    "url": "http://www.dnd5eapi.co/api/equipment/54"
  }`,
  `{
    "_id": "5a52bca1559f00418e53362e",
    "index": 209,
    "name": "Barding: Ring mail",
    "equipment_category": "Mounts and Vehicles",
    "vehicle_category": "Tack, Harness, and Drawn Vehicles",
    "cost": {
      "quantity": 12,
      "unit": "gp"
    },
    "weight": 80,
    "desc": [
      "Barding is armor designed to protect an animal’s head, neck, chest, and body. Any type of armor shown on the Armor table can be purchased as barding. The cost is four times the equivalent armor made for humanoids, and it weighs twice as much."
    ],
    "url": "http://www.dnd5eapi.co/api/equipment/209"
  }`,
]

const items = [];
for(let i = 0; i < itemJSONs.length; i++) {
  items.push(new RaceType(itemNames[i], itemJSONs[i]))
}

class EquipmentList extends Component {
  render() {
    return (
      <div className="EquipmentList">
        <Well>
          <b>List of Equipment:</b>
          <ListGroup>
            {items.map(item => (
              <EquipmentListItem item={item}/>
            ))}
          </ListGroup>
          </Well>
      </div>
    );
  }
}

export default EquipmentList;