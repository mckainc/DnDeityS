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
  }

  render () {
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
                />
              </FormGroup>
            </Col>

            <Col sm={2}>
              <FormGroup>
              <ControlLabel>Alignment</ControlLabel>
              <br></br>
                <DropdownButton id="alignment" title={this.state.alignment}>
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
                />
              </FormGroup>
            </Col>

            <Col sm={4}>
              <FormGroup>
                <ControlLabel>Flaws</ControlLabel>
                <FormControl
                  name="backstory"
                  componentClass="textarea"
                  placeholder="Enter character's flaws..."
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