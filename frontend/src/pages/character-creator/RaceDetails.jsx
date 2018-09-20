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
    }
  }

  setPickedLanguage = (pickedLanguage) => {
    console.log(pickedLanguage);
    this.setState({ pickedLanguage });
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
          <b>Traits:</b>
          {race.description.traits.map(trait => {
            return (<p>- {trait.name}</p>);
          })}
          {race.description.traits.length === 0 && <p>(none)</p>}
          <b>Proficiencies:</b>
          {race.description.starting_proficiencies.map(proficiency => {
            return (<p>- {proficiency.name}</p>);
          })}
          {race.description.starting_proficiencies.length === 0 && <p>(none)</p>}
        </Well>
      </div>
    );
  }
}

export default RaceDetails;