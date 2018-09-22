import React, { Component } from 'react';

// types
import RaceType from '../../objects/RaceType';

// components
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/lib/ToggleButton';
import CollapsableSection from '../../components/CollapsableSection';
import RaceDetails from './RaceDetails';

const testJSON = `{
	"_id": "5a52baf5559f00418e532726",
	"index": 5,
	"name": "Dragonborn",
	"speed": 30,
	"ability_bonuses": [
		2,
		0,
		0,
		0,
		0,
		1
	],
	"alignment": " Dragonborn tend to extremes, making a conscious choice for one side or the other in the cosmic war between good and evil. Most dragonborn are good, but those who side with evil can be terrible villains.",
	"age": "Young dragonborn grow quickly. They walk hours after hatching, attain the size and development of a 10-year-old human child by the age of 3, and reach adulthood by 15. They live to be around 80.",
	"size": "Medium",
	"size_description": "Dragonborn are taller and heavier than humans, standing well over 6 feet tall and averaging almost 250 pounds. Your size is Medium.",
	"starting_proficiencies": [],
	"languages": [
		{
			"name": "Common",
			"url": "http://www.dnd5eapi.co/api/languages/1"
		},
		{
			"name": "Draconic",
			"url": "http://www.dnd5eapi.co/api/languages/11"
		}
	],
	"language_desc": "You can speak, read, and write Common and Draconic. Draconic is thought to be one of the oldest languages and is often used in the study of magic. The language sounds harsh to most other creatures and includes numerous hard consonants and sibilants.",
	"traits": [
		{
			"url": "http://www.dnd5eapi.co/api/traits/24",
			"name": "Draconic Anscestry"
		},
		{
			"url": "http://www.dnd5eapi.co/api/traits/25",
			"name": "Breath Weapon"
		},
		{
			"url": "http://www.dnd5eapi.co/api/traits/36",
			"name": "Damage Resistance (Dragonborn)"
		}
	],
	"trait_options": {
		"choose": 1,
		"from": [
			{
				"url": "http://www.dnd5eapi.co/api/traits/26",
				"name": "Breath Weapon (Black)"
			},
			{
				"url": "http://www.dnd5eapi.co/api/traits/27",
				"name": "Breath Weapon (Blue)"
			},
			{
				"url": "http://www.dnd5eapi.co/api/traits/28",
				"name": "Breath Weapon (Brass)"
			},
			{
				"url": "http://www.dnd5eapi.co/api/traits/29",
				"name": "Breath Weapon (Bronze)"
			},
			{
				"url": "http://www.dnd5eapi.co/api/traits/30",
				"name": "Breath Weapon (Copper)"
			},
			{
				"url": "http://www.dnd5eapi.co/api/traits/31",
				"name": "Breath Weapon (Gold)"
			},
			{
				"url": "http://www.dnd5eapi.co/api/traits/32",
				"name": "Breath Weapon (Green)"
			},
			{
				"url": "http://www.dnd5eapi.co/api/traits/33",
				"name": "Breath Weapon (Red)"
			},
			{
				"url": "http://www.dnd5eapi.co/api/traits/34",
				"name": "Breath Weapon (Silver)"
			},
			{
				"url": "http://www.dnd5eapi.co/api/traits/35",
				"name": "Breath Weapon (White)"
			}
		],
		"type": "trait"
	},
	"subraces": [],
	"url": "http://www.dnd5eapi.co/api/races/5"
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

const dragonborn = new RaceType('Dragonborn', testJSON);
const human = new RaceType("Human", testJSON2)

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
			case "Dragonborn":
				race = dragonborn;
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
            <ToggleButton value="Elf">Elf</ToggleButton>
            <ToggleButton value="Halfling">Halfling</ToggleButton>
            <ToggleButton value="Human">Human</ToggleButton>
            <ToggleButton value="Dragonborn">Dragonborn</ToggleButton>
          </ToggleButtonGroup>
					{this.state.race !== 'none' && <RaceDetails race={this.state.race}/>}
        </CollapsableSection>
      </div>
    );
  }
}

export default RaceSection;