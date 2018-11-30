import React, { Component } from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';

//types
import { Map } from 'immutable';

// components
import CollapsableSection from '../../components/CollapsableSection';
//import IndividualSpecial from './IndividualSpecial';



class SpecialAbilitiesSection extends Component {
	constructor(props) {
		super(props);



		this.state = {
        
		}
	}
	
	handleChange = (e) => {
  
  }

  addAbility(){
    this.setState()
  }

  render() {
    const { changeMonster, monster } = this.props;
    return (
      <div className="SpecialAbilities" ref={this.props.innerRef}>
        <CollapsableSection title="SpecialAbilities" open={true}>
            <Row>
              <Col sm={2}>
                  <FormGroup>
                      <ControlLabel>Ability</ControlLabel>
                      <FormControl
                      name="name"
                      type="text"
                      placeholder="Ability Name"
                      onChange={(e) => changeMonster('description','ability1name', e.target.value, true)}
                      defaultValue={monster.description.ability1name}
                      />
                  </FormGroup>
                </Col>
                <Col sm={2}>
                <FormGroup>
                    <ControlLabel>Ability</ControlLabel>
                    <FormControl
                    name="name"
                    type="text"
                    placeholder="Ability Name"
                    onChange={(e) => changeMonster('description','ability2name', e.target.value, true)}
                    defaultValue={monster.description.ability2name}
                    />
                </FormGroup>
                </Col>
                <Col sm={2}>
                <FormGroup>
                    <ControlLabel>Ability</ControlLabel>
                    <FormControl
                    name="name"
                    type="text"
                    placeholder="Ability Name"
                    onChange={(e) => changeMonster('description','ability3name', e.target.value, true)}
                    defaultValue={monster.description.ability3name}
                    />
                </FormGroup>
                </Col>
            </Row>
            <Row>
            <Col sm={2}>
                  <FormGroup>
                      <ControlLabel>Desc</ControlLabel>
                      <FormControl
                      name="desc"
                      componentClass="textarea"
                      placeholder="Description"
                      onChange={(e) => changeMonster('description','ability1desc', e.target.value, true)}
                      defaultValue={monster.description.ability1desc}
                      />
                  </FormGroup>
                </Col>
                <Col sm={2}>
                <FormGroup>
                    <ControlLabel>Desc</ControlLabel>
                    <FormControl
                    name="desc"
                    componentClass="textarea"
                    placeholder="description"
                    onChange={(e) => changeMonster('description','ability2desc', e.target.value, true)}
                    defaultValue={monster.description.ability2desc}
                    />
                </FormGroup>
                </Col>
                <Col sm={2}>
                <FormGroup>
                    <ControlLabel>Desc</ControlLabel>
                    <FormControl
                    name="desc"
                    componentClass="textarea"
                    placeholder="Description"
                    onChange={(e) => changeMonster('description','ability3desc', e.target.value, true)}
                    defaultValue={monster.description.ability3desc}
                    />
                </FormGroup>
                </Col>
            </Row>
        </CollapsableSection>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => <SpecialAbilitiesSection innerRef={ref} {...props}/>);

/*
  {specialabilities.valueSeq().map(ability => (
              <IndividualSpecial ability={ability}/>
            ))}
            <Button onClick={}>Add Ability</Button>
*/