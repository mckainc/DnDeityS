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
	"_id": "5afe386947afbaf224116ced",
	"index": 2,
	"name": "Bard",
	"hit_die": 8,
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
					"name": "Skill: Arcana",
					"url": "http://www.dnd5eapi.co/api/proficiencies/107"
				},
				{
					"name": "Skill: Athletics",
					"url": "http://www.dnd5eapi.co/api/proficiencies/108"
				},
				{
					"name": "Skill: Deception",
					"url": "http://www.dnd5eapi.co/api/proficiencies/109"
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
					"name": "Skill: Investigation",
					"url": "http://www.dnd5eapi.co/api/proficiencies/113"
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
					"name": "Skill: Performance",
					"url": "http://www.dnd5eapi.co/api/proficiencies/117"
				},
				{
					"name": "Skill: Persuasion",
					"url": "http://www.dnd5eapi.co/api/proficiencies/118"
				},
				{
					"name": "Skill: Religion",
					"url": "http://www.dnd5eapi.co/api/proficiencies/119"
				},
				{
					"name": "Skill: Sleight of Hand",
					"url": "http://www.dnd5eapi.co/api/proficiencies/120"
				},
				{
					"name": "Skill: Stealth",
					"url": "http://www.dnd5eapi.co/api/proficiencies/121"
				},
				{
					"name": "Skill: Survival",
					"url": "http://www.dnd5eapi.co/api/proficiencies/122"
				}
			],
			"type": "proficiencies",
			"choose": 3
		},
		{
			"from": [
				{
					"name": "Bagpipes",
					"url": "http://www.dnd5eapi.co/api/proficiencies/81"
				},
				{
					"name": "Drum",
					"url": "http://www.dnd5eapi.co/api/proficiencies/82"
				},
				{
					"name": "Dulcimer",
					"url": "http://www.dnd5eapi.co/api/proficiencies/83"
				},
				{
					"name": "Flute",
					"url": "http://www.dnd5eapi.co/api/proficiencies/84"
				},
				{
					"name": "Lute",
					"url": "http://www.dnd5eapi.co/api/proficiencies/85"
				},
				{
					"name": "Lyre",
					"url": "http://www.dnd5eapi.co/api/proficiencies/86"
				},
				{
					"name": "Horn",
					"url": "http://www.dnd5eapi.co/api/proficiencies/87"
				},
				{
					"name": "Pan flute",
					"url": "http://www.dnd5eapi.co/api/proficiencies/88"
				},
				{
					"name": "Shawm",
					"url": "http://www.dnd5eapi.co/api/proficiencies/89"
				},
				{
					"name": "Viol",
					"url": "http://www.dnd5eapi.co/api/proficiencies/90"
				}
			],
			"type": "proficiencies",
			"choose": 3
		}
	],
	"proficiencies": [
		{
			"url": "http://www.dnd5eapi.co/api/proficiencies/1",
			"name": "Light armor"
		},
		{
			"url": "http://www.dnd5eapi.co/api/proficiencies/19",
			"name": "Simple weapons"
		},
		{
			"url": "http://www.dnd5eapi.co/api/proficiencies/42",
			"name": "Longswords"
		},
		{
			"url": "http://www.dnd5eapi.co/api/proficiencies/46",
			"name": "Rapiers"
		},
		{
			"url": "http://www.dnd5eapi.co/api/proficiencies/48",
			"name": "Shortswords"
		},
		{
			"url": "http://www.dnd5eapi.co/api/proficiencies/54",
			"name": "Crossbows, hand"
		}
	],
	"saving_throws": [
		{
			"url": "http://www.dnd5eapi.co/api/ability-scores/2",
			"name": "DEX"
		},
		{
			"url": "http://www.dnd5eapi.co/api/ability-scores/6",
			"name": "CHA"
		}
	],
	"starting_equipment": {
		"url": "http://www.dnd5eapi.co/api/startingequipment/2",
		"class": "Bard"
	},
	"class_levels": {
		"url": "http://www.dnd5eapi.co/api/classes/Bard/levels",
		"class": "Bard"
	},
	"subclasses": [
		{
			"name": "Lore",
			"url": "http://www.dnd5eapi.co/api/subclasses/2"
		}
	],
	"spellcasting": {
		"url": "http://www.dnd5eapi.co/api/spellcasting/1",
		"class": "Bard"
	},
	"url": "http://www.dnd5eapi.co/api/classes/2"
}`

const fighter = new RaceType('Fighter', testJSON);
const bard = new RaceType("Bard", testJSON2)

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
			case "Bard":
        currentClass = bard;
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
            <ToggleButton value="Bard">bard</ToggleButton>
            <ToggleButton value="Barbarian">Barbarian</ToggleButton>
          </ToggleButtonGroup>
					{this.state.currentClass !== 'none' && <ClassDetails currentClass={this.state.currentClass}/>}
        </CollapsableSection>
      </div>
    );
  }
}

export default ClassSection;