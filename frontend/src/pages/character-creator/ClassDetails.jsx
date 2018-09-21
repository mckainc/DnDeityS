import React, { PureComponent } from 'react';

// components
import Well from 'react-bootstrap/lib/Well';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

class ClassDetails extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pickedProficiency: 'Choose Another Proficiency',
    }
  }

  render() {
    const { currentClass } = this.props;
    return (
      <div>
        <Well>
          <p><b>Hit Die: </b>{currentClass.description.hit_die}</p>

          <div>
            <b>Proficiencies:</b>
            {currentClass.description.proficiencies.map(proficiency => (
              <p>- {proficiency.name}</p>
            ))}
            {currentClass.description.proficiencies.length === 0 && <p>(none)</p>}
          </div>

        </Well>
      </div>
    );
  }
}

export default ClassDetails;