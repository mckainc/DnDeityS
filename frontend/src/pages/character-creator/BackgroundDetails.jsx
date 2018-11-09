import React, { PureComponent } from 'react';

// components
import Well from 'react-bootstrap/lib/Well';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

const languages = [
  'Common', 'Dwarvish', 'Elvish', 'Giant', 'Gnomish', 'Goblin', 'Halfling', 'Orc',
  'Abyssal', 'Celestial', 'Draconic', 'Deep Speech', 'Infernal', 'Primordial', 'Sylvan', 'Undercommon',
]

class BackgroundDetails extends PureComponent {
  constructor(props) {
    super(props);

    let pickedSpecialty = props.loaded ? props.character.description.background_specialty : 'Choose One';
    let pickedLanguage1 = props.loaded ? props.character.description.background_language1 : 'Choose Another Language';
    let pickedLanguage2 = props.loaded ? props.character.description.background_language2 : 'Choose Another Language';

    if (pickedSpecialty === '') pickedSpecialty = 'Choose One';
    if (pickedLanguage1 === '') pickedLanguage1 = 'Choose Another Language';
    if (pickedLanguage2 === '') pickedLanguage2 = 'Choose Another Language';

    this.state = {
      pickedSpecialty,
      pickedLanguage1,
      pickedLanguage2,
    }
  }

  setpickedSpecialty = (pickedSpecialty) => {
    this.setState({ pickedSpecialty });
    this.props.changeCharacter('background_specialty', pickedSpecialty, true);
  }

  setPickedLanguage1 = (pickedLanguage1) => {
    this.setState({ pickedLanguage1 });
    this.props.changeCharacter('background_language1', pickedLanguage1, true);
  }

  setPickedLanguage2 = (pickedLanguage2) => {
    this.setState({ pickedLanguage2 });
    this.props.changeCharacter('background_language2', pickedLanguage2, true);
  }

  render() {
    const { background } = this.props;
    return (
      <div>
       <Well>
        <p><b>Description: </b>{background.description.description}</p>
        <p><b>Equipment: </b>{background.description.equipment}</p>

        <div>
          <b>Proficiencies:</b>
          {background.description.proficiencies.map(proficiency => (
            <p>- {proficiency.name.replace(/u2019/g, '\'')}</p>
          ))}
        </div>

        {typeof background.description.language_options !== 'undefined' &&
          <div>
            <p><b>Languages:</b></p>
            <DropdownButton id="language1 choice" title={this.state.pickedLanguage1}>
              {languages.map(language => (
                <MenuItem id={language} onSelect={this.setPickedLanguage1} eventKey={language}>{language}</MenuItem>
              ))}
            </DropdownButton>
            {background.description.language_options.choose === 2 &&
            <DropdownButton id="language2 choice" title={this.state.pickedLanguage2}>
              {languages.map(language => (
                <MenuItem id={language} onSelect={this.setPickedLanguage2} eventKey={language}>{language}</MenuItem>
              ))}
            </DropdownButton>
            }
          </div>
        }

        {typeof background.description.specialty !== 'undefined' &&
          <div>
            <p><b>{background.description.specialty.type}</b></p>
            <DropdownButton id="specialty choice" title={this.state.pickedSpecialty}>
              {background.description.specialty.choices.map(specialty => (
                <MenuItem id={specialty} onSelect={this.setpickedSpecialty} eventKey={specialty}>{specialty}</MenuItem>
              ))}
            </DropdownButton>
            <br />
          </div>
        }

        <p><b>{background.description.feature.name}: </b>{background.description.feature.description}</p>
       </Well>
      </div>
    )
  }
}

export default BackgroundDetails;