import React, { Component } from 'react';

import RaceType from '../../objects/RaceType';

import CollapsableSection from '../../components/CollapsableSection';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button';

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

class RaceSection extends Component {
  render() {
    const human = new RaceType('Halfling', testJSON);
    console.log(human);
    
    return (
      <div className="RaceSection">
        <CollapsableSection title="Race" open={true}>
          <ButtonGroup>
            <Button>Dwarf</Button>
            <Button>Elf</Button>
            <Button>Halfling</Button>
            <Button>Human</Button>
            <Button>Dragonborn</Button>
          </ButtonGroup>
        </CollapsableSection>
      </div>
    );
  }
}

export default RaceSection;