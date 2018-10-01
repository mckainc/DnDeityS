import React, { PureComponent } from 'react';

// components
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Well from 'react-bootstrap/lib/Well';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

class ClassDetails extends PureComponent {
  constructor(props) {
    super(props);

    let profChoices;
    let options = props.currentClass.description.proficiency_choices;
    if (typeof options !== 'undefined') {
      // Initialize profChoices to hold all of the proficiency choices a user needs to make for a certain class
      profChoices = new Array(options.length);
      for (let i = 0; i < options.length; i++) {
        profChoices[i] = new Array(options[i].choose)
        for (let j = 0; j < options[i].choose; j++) {
          profChoices[i][j] = "Choose Another Proficiency"
        }
      }
    }

    this.state = {
      profChoices: profChoices,
      options: options,
    }
  }

  // update state if a new class is selected
  componentWillReceiveProps(nextProps) {
    let profChoices;
    let options = nextProps.currentClass.description.proficiency_choices;
    if (typeof options !== 'undefined') {
      // Initialize profChoices to hold all of the proficiency choices a user needs to make for a certain class
      profChoices = new Array(options.length);
      for (let i = 0; i < options.length; i++) {
        profChoices[i] = new Array(options[i].choose)
        for (let j = 0; j < options[i].choose; j++) {
          profChoices[i][j] = "Choose Another Proficiency"
        }
      }
    }

    this.setState({ profChoices, options });
  }

  // update profChoices when a choice is selected from a dropdown
  setChoosenProficiency = (choice, i, j) => {
    const { profChoices } = this.state;
    profChoices[i][j] = choice.name;
    this.setState({ profChoices });
    this.forceUpdate();
  }

  render() {
    const { currentClass } = this.props;
    const { profChoices, options } = this.state;

    return (
      <div>
        <Well>
          <p><b>Hit Die: </b>{currentClass.description.hit_die}</p>

          <div>
            <b>Saving Throws:</b>
            {currentClass.description.saving_throws.map(saving_throw => (
              <p>- {saving_throw.name}</p>
            ))}
            {currentClass.description.saving_throws.length === 0 && <p>(none)</p>}
          </div>

          <div>
            <b>Proficiencies:</b>
            {currentClass.description.proficiencies.map(proficiency => (
              <p>- {proficiency.name}</p>
            ))}
            {profChoices.map((profChoice, index) => (
              <div>
                <ButtonToolbar>
                  {profChoice.map((choice, index2) => (
                    <DropdownButton id="choice" title={choice}>
                      {options[index].from.map(option => (
                        <MenuItem
                          id={option.name}
                          onSelect={() => this.setChoosenProficiency(option, index, index2)}
                          eventKey={option.name}
                        >
                          {option.name}
                        </MenuItem>
                      ))}
                    </DropdownButton>
                  ))}
                </ButtonToolbar>
              </div>
            ))}
            {currentClass.description.proficiencies.length === 0 && <p>(none)</p>}
          </div>

        </Well>
      </div>
    );
  }
}

export default ClassDetails;