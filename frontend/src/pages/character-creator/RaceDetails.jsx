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

    this.state = {
      pickedLanguage: 'Choose Another Language',
      pickedProficiency: 'Choose Another Proficiency',
      pickedTrait: 'Choose Another Trait',
    }
  }

  setPickedLanguage = (pickedLanguage) => {
    this.setState({ pickedLanguage });
  }

  setPickedProficiency = (pickedProficiency) => {
    this.setState({ pickedProficiency });
  }

  setPickedTrait = (pickedTrait) => {
    this.setState({ pickedTrait });
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
            {race.description.languages.map(language => {
              return (<p>- {language.name}</p>);
            })}
            {race.description.language_options !== undefined &&
              <DropdownButton title={this.state.pickedLanguage}>
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
              <DropdownButton title={this.state.pickedTrait}>
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
              <DropdownButton title={this.state.pickedProficiency}>
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