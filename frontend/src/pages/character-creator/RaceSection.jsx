import React, { Component } from 'react';

// types
import RaceType from '../../objects/RaceType';

// components
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/lib/ToggleButton';
import CollapsableSection from '../../components/CollapsableSection';
import RaceDetails from './RaceDetails';

const testJSON = `{
	"_id": "5a52baf5559f00418e532723",
	"index": 3,
	"name": "Halfling",
	"speed": 25,
	"ability_bonuses": [
		0,
		2,
		0,
		0,
		0,
		0
	],
	"age": "A halfling reaches adulthood at the age of 20 and generally lives into the middle of his or her second century.",
	"alignment": "Most halflings are lawful good. As a rule, they are good-hearted and kind, hate to see others in pain, and have no tolerance for oppression. They are also very orderly and traditional, leaning heavily on the support of their community and the comfort of their old ways.",
	"size": "Small",
	"size_description": "Halflings average about 3 feet tall and weigh about 40 pounds. Your size is Small.",
	"starting_proficiencies": [],
	"languages": [
		{
			"name": "Common",
			"url": "http://www.dnd5eapi.co/api/languages/1"
		},
		{
			"name": "Halfling",
			"url": "http://www.dnd5eapi.co/api/languages/7"
		}
	],
	"language_desc": "You can speak, read, and write Common and Halfling. The Halfling language isn’t secret, but halflings are loath to share it with others. They write very little, so they don’t have a rich body of literature. Their oral tradition, however, is very strong. Almost all halflings speak Common to converse with the people in whose lands they dwell or through which they are traveling.",
	"traits": [
		{
			"url": "http://www.dnd5eapi.co/api/traits/21",
			"name": "Brave"
		},
		{
			"url": "http://www.dnd5eapi.co/api/traits/22",
			"name": "Halfling Nimbleness"
		},
		{
			"url": "http://www.dnd5eapi.co/api/traits/23",
			"name": "Lucky"
		}
	],
	"subraces": [
		{
			"name": "Lightfoot Halfling",
			"url": "http://www.dnd5eapi.co/api/subraces/3"
		}
	],
	"url": "http://www.dnd5eapi.co/api/races/3"
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

const halfling = new RaceType('Halfling', testJSON);
const human = new RaceType("Human", testJSON2)
console.log(halfling);
console.log(human);

class RaceSection extends Component {
	constructor(props) {
		super(props);

		this.state = {
				race: human,
		}
	}
	
	handleRaceChange = (e) => {
		let race = 'none';
		// TODO traverse array of races from server
		// find race by name
		switch(e) {
			case "Halfling":
				race = halfling;
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
            <ToggleButton>Dwarf</ToggleButton>
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