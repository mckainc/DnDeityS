import React, { PureComponent } from 'react';

// components
import Well from 'react-bootstrap/lib/Well';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

const languages = [
  'Common', 'Dwarvish', 'Elvish', 'Giant', 'Gnomish', 'Goblin', 'Halfling', 'Orc',
  'Abyssal', 'Celestial', 'Draconic', 'Deep Speech', 'Infernal', 'Primordial', 'Sylvan', 'Undercommon',
]

class RaceDetails extends PureComponent {
  constructor(props) {
    super(props);

    let pickedLanguage = props.loaded ? props.character.race_language_choice : 'Choose Another Language';
    let pickedProficiency = props.loaded ? props.character.race_proficiency_choice : 'Choose Another Proficiency';
    let pickedTrait = props.loaded ? props.character.race_trait_choice : 'Choose Another Trait';

    if (pickedLanguage === '') pickedLanguage = 'Choose Another Language';
    if (pickedProficiency === '') pickedProficiency = 'Choose Another Proficiency';
    if (pickedTrait === '') pickedTrait = 'Choose Another Trait';

    this.state = {
      pickedLanguage,
      pickedProficiency,
      pickedTrait,
    }
  }

  setPickedLanguage = (pickedLanguage) => {
    this.setState({ pickedLanguage });
    this.props.changeCharacter('race_language_choice', pickedLanguage);
  }

  setPickedProficiency = (pickedProficiency) => {
    this.setState({ pickedProficiency });
    this.props.changeCharacter('race_proficiency_choice', pickedProficiency);
  }

  setPickedTrait = (pickedTrait) => {
    this.setState({ pickedTrait });
    this.props.changeCharacter('race_trait_choice', pickedTrait);
  }

  render() {
    const { race } = this.props;
    return (
      <div>
        <Well>
          <p><b>Age: </b>{race.description.age}</p>
          <p><b>Alignment: </b>{race.description.alignment}</p>          
          <p><b>Size: </b>{race.description.size}</p>
          <p><b>Speed: </b>{race.description.speed}</p>

          <div>
            <b>Languages:</b>
            {race.description.languages.map(language => (
              <p>- {language.name}</p>
            ))}
            {race.description.language_options !== undefined &&
              <DropdownButton id="language choice" title={this.state.pickedLanguage}>
                {languages.map(language => (
                  <MenuItem id={language} onSelect={this.setPickedLanguage} eventKey={language}>{language}</MenuItem>
                ))}
              </DropdownButton>
            }
          </div>

          <div>
          <b>Traits:</b>
            {race.description.traits.map(trait => (
              <p>- {trait.name}</p>
            ))}
            {race.description.trait_options !== undefined &&
              <DropdownButton id="trait choice" title={this.state.pickedTrait}>
                {race.description.trait_options.from.map(trait => (
                  <MenuItem id={trait.name} onSelect={this.setPickedTrait} eventKey={trait.name}>{trait.name}</MenuItem>
                ))}
              </DropdownButton>
            }
            {race.description.traits.length === 0 && <p>(none)</p>}
          </div>

          <div>
            <b>Proficiencies:</b>
            {race.description.starting_proficiencies.map(proficiency => (
              <p>- {proficiency.name}</p>
            ))}
            {race.description.starting_proficiency_options !== undefined &&
              <DropdownButton id="proficiency choice" title={this.state.pickedProficiency}>
                {race.description.starting_proficiency_options.from.map(proficiency => (
                  <MenuItem id={proficiency.name} onSelect={this.setPickedProficiency} eventKey={proficiency.name}>{proficiency.name}</MenuItem>
                ))}
              </DropdownButton>
            }
            {race.description.starting_proficiencies.length === 0 && <p>(none)</p>}
          </div>

        </Well>
      </div>
    );
  }
}

export default RaceDetails;