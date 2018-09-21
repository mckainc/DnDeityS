import React, { Component } from 'react';

// types
import RaceType from '../../objects/RaceType';

// components
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/lib/ToggleButton';
import CollapsableSection from '../../components/CollapsableSection';
import ClassDetails from './ClassDetails';

const testJSON = `{
	"_id": "5afe386947afbaf224116cf0",
	"index": 5,
	"name": "Fighter",
	"hit_die": 10,
	"proficiency_choices": [
		{
			"from": [
				{
					"name": "Skill: Acrobatics",
					"url": "http://www.dnd5eapi.co/api/proficiencies/105"
				},
				{
					"name": "Skill: Animal Handling",
					"url": "http://www.dnd5eapi.co/api/proficiencies/106"
				},
				{
					"name": "Skill: Athletics",
					"url": "http://www.dnd5eapi.co/api/proficiencies/108"
				},
				{
					"name": "Skill: History",
					"url": "http://www.dnd5eapi.co/api/proficiencies/110"
				},
				{
					"name": "Skill: Insight",
					"url": "http://www.dnd5eapi.co/api/proficiencies/111"
				},
				{
					"name": "Skill: Intimidation",
					"url": "http://www.dnd5eapi.co/api/proficiencies/112"
				},
				{
					"name": "Skill: Perception",
					"url": "http://www.dnd5eapi.co/api/proficiencies/116"
				},
				{
					"name": "Skill: Survival",
					"url": "http://www.dnd5eapi.co/api/proficiencies/122"
				}
			],
			"type": "proficiencies",
			"choose": 2
		}
	],
	"proficiencies": [
		{
			"url": "http://www.dnd5eapi.co/api/proficiencies/4",
			"name": "All armor"
		},
		{
			"url": "http://www.dnd5eapi.co/api/proficiencies/18",
			"name": "Shields"
		},
		{
			"url": "http://www.dnd5eapi.co/api/proficiencies/19",
			"name": "Simple weapons"
		},
		{
			"url": "http://www.dnd5eapi.co/api/proficiencies/20",
			"name": "Martial weapons"
		}
	],
	"saving_throws": [
		{
			"url": "http://www.dnd5eapi.co/api/ability-scores/1",
			"name": "STR"
		},
		{
			"url": "http://www.dnd5eapi.co/api/ability-scores/3",
			"name": "CON"
		}
	],
	"starting_equipment": {
		"url": "http://www.dnd5eapi.co/api/startingequipment/5",
		"class": "Fighter"
	},
	"class_levels": {
		"url": "http://www.dnd5eapi.co/api/classes/Fighter/levels",
		"class": "Fighter"
	},
	"subclasses": [
		{
			"name": "Champion",
			"url": "http://www.dnd5eapi.co/api/subclasses/5"
		}
	],
	"url": "http://www.dnd5eapi.co/api/classes/5"
}`

const testJSON2 = `{
	"_id": "5afe386947afbaf224116cef",
	"index": 4,
	"name": "Druid",
	"hit_die": 8,
	"proficiency_choices": [
		{
			"from": [
				{
					"name": "Skill: Animal Handling",
					"url": "http://www.dnd5eapi.co/api/proficiencies/106"
				},
				{
					"name": "Skill: Arcana",
					"url": "http://www.dnd5eapi.co/api/proficiencies/107"
				},
				{
					"name": "Skill: Insight",
					"url": "http://www.dnd5eapi.co/api/proficiencies/111"
				},
				{
					"name": "Skill: Medicine",
					"url": "http://www.dnd5eapi.co/api/proficiencies/114"
				},
				{
					"name": "Skill: Nature",
					"url": "http://www.dnd5eapi.co/api/proficiencies/115"
				},
				{
					"name": "Skill: Perception",
					"url": "http://www.dnd5eapi.co/api/proficiencies/116"
				},
				{
					"name": "Skill: Religion",
					"url": "http://www.dnd5eapi.co/api/proficiencies/119"
				},
				{
					"name": "Skill: Survival",
					"url": "http://www.dnd5eapi.co/api/proficiencies/122"
				}
			],
			"type": "proficiencies",
			"choose": 2
		}
	],
	"proficiencies": [
		{
			"url": "http://www.dnd5eapi.co/api/proficiencies/1",
			"name": "Light armor"
		},
		{
			"url": "http://www.dnd5eapi.co/api/proficiencies/2",
			"name": "Medium armor"
		},
		{
			"url": "http://www.dnd5eapi.co/api/proficiencies/18",
			"name": "Shields"
		},
		{
			"url": "http://www.dnd5eapi.co/api/proficiencies/21",
			"name": "Clubs"
		},
		{
			"url": "http://www.dnd5eapi.co/api/proficiencies/22",
			"name": "Daggers"
		},
		{
			"url": "http://www.dnd5eapi.co/api/proficiencies/25",
			"name": "Javelins"
		},
		{
			"url": "http://www.dnd5eapi.co/api/proficiencies/27",
			"name": "Maces"
		},
		{
			"url": "http://www.dnd5eapi.co/api/proficiencies/28",
			"name": "Quarterstaffs"
		},
		{
			"url": "http://www.dnd5eapi.co/api/proficiencies/29",
			"name": "Sickles"
		},
		{
			"url": "http://www.dnd5eapi.co/api/proficiencies/30",
			"name": "Spears"
		},
		{
			"url": "http://www.dnd5eapi.co/api/proficiencies/32",
			"name": "Darts"
		},
		{
			"url": "http://www.dnd5eapi.co/api/proficiencies/34",
			"name": "Slings"
		},
		{
			"url": "http://www.dnd5eapi.co/api/proficiencies/47",
			"name": "Scimitars"
		},
		{
			"url": "http://www.dnd5eapi.co/api/proficiencies/93",
			"name": "Herbalism Kit"
		}
	],
	"saving_throws": [
		{
			"url": "http://www.dnd5eapi.co/api/ability-scores/4",
			"name": "INT"
		},
		{
			"url": "http://www.dnd5eapi.co/api/ability-scores/5",
			"name": "WIS"
		}
	],
	"starting_equipment": {
		"url": "http://www.dnd5eapi.co/api/startingequipment/4",
		"class": "Druid"
	},
	"class_levels": {
		"url": "http://www.dnd5eapi.co/api/classes/Druid/levels",
		"class": "Druid"
	},
	"subclasses": [
		{
			"name": "Land",
			"url": "http://www.dnd5eapi.co/api/subclasses/4"
		}
	],
	"spellcasting": {
		"url": "http://www.dnd5eapi.co/api/spellcasting/3",
		"class": "Druid"
	},
	"url": "http://www.dnd5eapi.co/api/classes/4"
}`

const fighter = new RaceType('Fighter', testJSON);
const druid = new RaceType("Druid", testJSON2)
console.log(fighter);
console.log(druid);

class ClassSection extends Component {
	constructor(props) {
		super(props);

		this.state = {
				currentClass: 'none',
		}
	}
	
	handleClassChange = (e) => {
		let currentClass = 'none';
		// TODO traverse array of classes from server
		// find class by name
		switch(e) {
			case "Fighter":
        currentClass = fighter;
				break;
			case "Druid":
        currentClass = druid;
				break;
		}
		this.setState({ currentClass });
	}

  render() {
		// TODO traverse array of classes from server to render class buttons
    return (
      <div className="ClassSection">
        <CollapsableSection title="Class" open={true}>
          <ToggleButtonGroup
						value={this.state.currentClass.name}
						type="radio"
						name="class-options"
						onChange={this.handleClassChange}
					>
            <ToggleButton value="Fighter">Fighter</ToggleButton>
            <ToggleButton value="Druid">Druid</ToggleButton>
            <ToggleButton value="Barbarian">Barbarian</ToggleButton>
          </ToggleButtonGroup>
					{this.state.currentClass !== 'none' && <ClassDetails currentClass={this.state.currentClass}/>}
        </CollapsableSection>
      </div>
    );
  }
}

export default ClassSection;