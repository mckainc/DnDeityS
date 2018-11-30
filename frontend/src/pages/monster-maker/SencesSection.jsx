import React, { Component } from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel, } from 'react-bootstrap';

// components
import CollapsableSection from '../../components/CollapsableSection';



class SencesSection extends Component {
	constructor(props) {
		super(props);

        const armor_class = props.loaded ? props.monster.name : 'none';
        const hit_points = props.loaded ? props.monster.size : 'none';
        const hit_dice = props.loaded ? props.monster.type : 'none';
        const speed = props.loaded ? props.monster.subtype : 'none';

		this.state = {
            armor_class: armor_class,
            hit_points: hit_points,
            hit_dice: hit_dice,
            speed: speed,
		}
	}
	
	handleChange = (e) => {
	
	}

  render() {
    const { changeMonster, monster } = this.props;
    return (
      <div className="SencesSection" ref={this.props.innerRef}>
        <CollapsableSection title="Sences" open={true}>
            <Row>
                <Col sm={2}>
                <FormGroup>
                    <ControlLabel>Vision</ControlLabel>
                    <FormControl
                    name="vision"
                    type="text"
                    placeholder="Enter monster's Sight"
                    onChange={(e) => changeMonster('description','vision', e.target.value, true)}
                    defaultValue={monster.vision1}
                    />
                </FormGroup>
                </Col>

                <Col sm={2}>
                <FormGroup>
                    <ControlLabel>Passive Perception</ControlLabel>
                    <FormControl
                    name="perception"
                    type="number"
                    placeholder="Enter monster's Passive Perception"
                    onChange={(e) => changeMonster('description','passivePerception', e.target.value, true)}
                    defaultValue={monster.passivePerception}
                    />
                </FormGroup>
                </Col>
            </Row>
        </CollapsableSection>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => <SencesSection innerRef={ref} {...props}/>);