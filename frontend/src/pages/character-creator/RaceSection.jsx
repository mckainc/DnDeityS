import React, { Component } from 'react';

// types
import RaceType from '../../objects/RaceType';

// components
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/lib/ToggleButton';
import CollapsableSection from '../../components/CollapsableSection';
import RaceDetails from './RaceDetails';

const testJSON = `{
	"_id": "5a52baf5559f00418e532721",
	"index": 1,
	"name": "Dwarf",
	"speed": 30,
	"ability_bonuses": [
		0,
		0,
		2,
		0,
		0,
		0
	],
	"alignment": "Most dwarves are lawful, believing firmly in the benefits of a well-ordered society. They tend toward good as well, with a strong sense of fair play and a belief that everyone deserves to share in the benefits of a just order.",
	"age": "Dwarves mature at the same rate as humans, but they’re considered young until they reach the age of 50. On average, they live about 350 years.",
	"size": "Medium",
	"size_description": "Dwarves stand between 4 and 5 feet tall and average about 150 pounds. Your size is Medium.",
	"starting_proficiencies": [
		{
			"name": "Battleaxes",
			"url": "http://www.dnd5eapi.co/api/proficiencies/20"
		},
		{
			"name": "Handaxes",
			"url": "http://www.dnd5eapi.co/api/proficiencies/24"
		},
		{
			"name": "Light hammers",
			"url": "http://www.dnd5eapi.co/api/proficiencies/26"
		},
		{
			"name": "Warhammers",
			"url": "http://www.dnd5eapi.co/api/proficiencies/51"
		}
	],
	"starting_proficiency_options": {
		"choose": 1,
		"type": "proficiencies",
		"from": [
			{
				"name": "Smith's tools",
				"url": "http://www.dnd5eapi.co/api/proficiencies/71"
			},
			{
				"name": "Brewer's supplies",
				"url": "http://www.dnd5eapi.co/api/proficiencies/59"
			},
			{
				"name": "Mason's tools",
				"url": "http://www.dnd5eapi.co/api/proficiencies/68"
			}
		]
	},
	"languages": [
		{
			"name": "Common",
			"url": "http://www.dnd5eapi.co/api/languages/1"
		},
		{
			"name": "Dwarvish",
			"url": "http://www.dnd5eapi.co/api/languages/2"
		}
	],
	"language_desc": "You can speak, read, and write Common and Dwarvish. Dwarvish is full of hard consonants and guttural sounds, and those characteristics spill over into whatever other language a dwarf might speak.",
	"traits": [
		{
			"url": "http://www.dnd5eapi.co/api/traits/1",
			"name": "Darkvision (Dwarf)"
		},
		{
			"url": "http://www.dnd5eapi.co/api/traits/2",
			"name": "Dwarven Resilience"
		},
		{
			"url": "http://www.dnd5eapi.co/api/traits/3",
			"name": "Stonecunning"
		}
	],
	"subraces": [
		{
			"name": "Hill Dwarf",
			"url": "http://www.dnd5eapi.co/api/subraces/1"
		},
		{
			"name": "Mountain Dwarf",
			"url": "http://www.dnd5eapi.co/api/subraces/4"
		}
	],
	"url": "http://www.dnd5eapi.co/api/races/1"
}`

const testJSON2 = `{
	"_id": "5a52baf5559f00418e532722",
	"index": 4,
	"name": "Human",
	"speed": 30,
	"ability_bonuses": [
		1,
		1,
		1,
		1,
		1,
		1
	],
	"age": "Humans reach adulthood in their late teens and live less than a century.",
	"alignment": "Humans tend toward no particular alignment. The best and the worst are found among them.",
	"size": "Medium",
	"size_description": "Humans vary widely in height and build, from barely 5 feet to well over 6 feet tall. Regardless of your position in that range, your size is Medium.",
	"starting_proficiencies": [],
	"languages": [
		{
			"name": "Common",
			"url": "http://www.dnd5eapi.co/api/languages/1"
		}
	],
	"language_options": {
		"choose": 1,
		"type": "languages",
		"from": [
			{
				"name": "Dwarvish",
				"url": "http://www.dnd5eapi.co/api/languages/2"
			},
			{
				"name": "Elvish",
				"url": "http://www.dnd5eapi.co/api/languages/3"
			},
			{
				"name": "Giant",
				"url": "http://www.dnd5eapi.co/api/languages/4"
			},
			{
				"name": "Gnomish",
				"url": "http://www.dnd5eapi.co/api/languages/5"
			},
			{
				"name": "Goblin",
				"url": "http://www.dnd5eapi.co/api/languages/6"
			},
			{
				"name": "Halfling",
				"url": "http://www.dnd5eapi.co/api/languages/7"
			},
			{
				"name": "Orc",
				"url": "http://www.dnd5eapi.co/api/languages/8"
			},
			{
				"name": "Abyssal",
				"url": "http://www.dnd5eapi.co/api/languages/9"
			},
			{
				"name": "Celestial",
				"url": "http://www.dnd5eapi.co/api/languages/10"
			},
			{
				"name": "Draconic",
				"url": "http://www.dnd5eapi.co/api/languages/11"
			},
			{
				"name": "Deep Speech",
				"url": "http://www.dnd5eapi.co/api/languages/12"
			},
			{
				"name": "Infernal",
				"url": "http://www.dnd5eapi.co/api/languages/13"
			},
			{
				"name": "Primordial",
				"url": "http://www.dnd5eapi.co/api/languages/14"
			},
			{
				"name": "Sylvan",
				"url": "http://www.dnd5eapi.co/api/languages/15"
			},
			{
				"name": "Undercommon",
				"url": "http://www.dnd5eapi.co/api/languages/16"
			}
		]
	},
	"language_desc": "You can speak, read, and write Common and one extra language of your choice. Humans typically learn the languages of other peoples they deal with, including obscure dialects. They are fond of sprinkling their speech with words borrowed from other tongues: Orc curses, Elvish musical expressions, Dwarvish military phrases, and so on.",
	"traits": [],
	"subraces": [],
	"url": "http://www.dnd5eapi.co/api/races/4"
}`

const dwarf = new RaceType('Dwarf', testJSON);
const human = new RaceType("Human", testJSON2)
console.log(dwarf);
console.log(human);

class RaceSection extends Component {
	constructor(props) {
		super(props);

		this.state = {
				race: 'none',
		}
	}
	
	handleRaceChange = (e) => {
		let race = 'none';
		// TODO traverse array of races from server
		// find race by name
		switch(e) {
			case "Dwarf":
				race = dwarf;
				break;
			case "Human":
				race = human
				break;
		}
		this.setState({ race });
	}

  render() {
		// TODO traverse array of races from server to render race buttons
    return (
      <div className="RaceSection">
        <CollapsableSection title="Race" open={true}>
          <ToggleButtonGroup
						value={this.state.race.name}
						type="radio"
						name="race-options"
						onChange={this.handleRaceChange}
					>
            <ToggleButton value="Dwarf">Dwarf</ToggleButton>
            <ToggleButton>Elf</ToggleButton>
            <ToggleButton value="Halfling">Halfling</ToggleButton>
            <ToggleButton value="Human">Human</ToggleButton>
            <ToggleButton>Dragonborn</ToggleButton>
          </ToggleButtonGroup>
					{this.state.race !== 'none' && <RaceDetails race={this.state.race}/>}
        </CollapsableSection>
      </div>
    );
  }
}

export default RaceSection;