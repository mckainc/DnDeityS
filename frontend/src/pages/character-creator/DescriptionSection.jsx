import React, { Component } from 'react';

// components
import CollapsableSection from '../../components/CollapsableSection';

import { Row, Col, FormGroup, FormControl, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';

const alignments = [
  'Lawful Good', 'Lawful Neutral', 'Lawful Evil',
  'Neutral Good', 'True Neutral', 'Neutral Evil',
  'Chaotic Good', 'Chaotic Neutral', 'Chaotic Evil',
]

class DescriptionSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alignment: 'Choose an Alignment'
    }
  }

  setAlignment = (alignment) => {
    this.setState({ alignment });
    this.props.changeCharacter('alignment', alignment, true);
  }

  render () {
    const { changeCharacter, character } = this.props;
    return (
      <div className="DescriptionSection" ref={this.props.innerRef}>
        <CollapsableSection title="Description" open>

          <Row>
            <Col sm={2}>
              <FormGroup>
                <ControlLabel>Age</ControlLabel>
                <FormControl
                  name="age"
                  type="number"
                  placeholder="Enter character's age"
                  onChange={(e) => changeCharacter('age', e.target.value, true)}
                  defaultValue={character.description.age}
                />
              </FormGroup>
            </Col>

            <Col sm={2}>
              <FormGroup>
                <ControlLabel>Gender</ControlLabel>
                <FormControl
                  name="gender"
                  type="text"
                  placeholder="Enter character's gender..."
                  onChange={(e) => changeCharacter('gender', e.target.value, true)}
                  defaultValue={character.description.gender}
                />
              </FormGroup>
            </Col>

            <Col sm={2}>
              <FormGroup>
                <ControlLabel>Homeland</ControlLabel>
                <FormControl
                  name="homeland"
                  type="text"
                  placeholder="Enter character's homeland..."
                  onChange={(e) => changeCharacter('homeland', e.target.value, true)}
                  defaultValue={character.description.homeland}
                />
              </FormGroup>
            </Col>

            <Col sm={2}>
              <FormGroup>
                <ControlLabel>Faith</ControlLabel>
                <FormControl
                  name="faith"
                  type="text"
                  placeholder="Enter character's faith..."
                  onChange={(e) => changeCharacter('faith', e.target.value, true)}
                  defaultValue={character.description.faith}
                />
              </FormGroup>
            </Col>

            <Col sm={2}>
              <FormGroup>
              <ControlLabel>Alignment</ControlLabel>
              <br></br>
                <DropdownButton id="alignment" title={this.state.alignment} title={character.description.alignment}>
                  {alignments.map(alignment => (
                    <MenuItem id={alignment} onSelect={this.setAlignment} eventKey={alignment}>{alignment}</MenuItem>
                  ))}
                </DropdownButton>
              </FormGroup>
            </Col>
          </Row>

          <br></br>

          <Row>
            <Col sm={4}>
              <FormGroup>
                <ControlLabel>Personality</ControlLabel>
                <FormControl
                  name="personality"
                  componentClass="textarea"
                  placeholder="Enter personality description..."
                  onChange={(e) => changeCharacter('personality', e.target.value, true)}
                  defaultValue={character.description.personality}
                />
              </FormGroup>
            </Col>

            <Col sm={4}>
              <FormGroup>
                <ControlLabel>Appearance</ControlLabel>
                <FormControl
                  name="appearance"
                  componentClass="textarea"
                  placeholder="Enter appearance description..."
                  onChange={(e) => changeCharacter('appearance', e.target.value, true)}
                  defaultValue={character.description.appearance}
                />
              </FormGroup>
            </Col>

            <Col sm={4}>
              <FormGroup>
                <ControlLabel>Backstory</ControlLabel>
                <FormControl
                  name="backstory"
                  componentClass="textarea"
                  placeholder="Enter character's backstory..."
                  onChange={(e) => changeCharacter('backstory', e.target.value, true)}
                  defaultValue={character.description.backstory}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col sm={4}>
              <FormGroup>
                <ControlLabel>Bonds</ControlLabel>
                <FormControl
                  name="bonds"
                  componentClass="textarea"
                  placeholder="Enter character's bonds..."
                  onChange={(e) => changeCharacter('bonds', e.target.value, true)}
                  defaultValue={character.description.bonds}
                />
              </FormGroup>
            </Col>

            <Col sm={4}>
              <FormGroup>
                <ControlLabel>Ideals</ControlLabel>
                <FormControl
                  name="ideals"
                  componentClass="textarea"
                  placeholder="Enter character's ideals..."
                  onChange={(e) => changeCharacter('ideals', e.target.value, true)}
                  defaultValue={character.description.ideals}
                />
              </FormGroup>
            </Col>

            <Col sm={4}>
              <FormGroup>
                <ControlLabel>Flaws</ControlLabel>
                <FormControl
                  name="flaws"
                  componentClass="textarea"
                  placeholder="Enter character's flaws..."
                  onChange={(e) => changeCharacter('flaws', e.target.value, true)}
                  defaultValue={character.description.flaws}
                />
              </FormGroup>
            </Col>
          </Row>
        </CollapsableSection>
      </div>
    )
  }
}

export default React.forwardRef((props, ref) => <DescriptionSection innerRef={ref} {...props}/>);