import React, { Component } from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel, } from 'react-bootstrap';

// components
import CollapsableSection from '../../components/CollapsableSection';



class CombatSection extends Component {
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
      <div className="CombatSection" ref={this.props.innerRef}>
        <CollapsableSection title="Combat" open={true}>
            <Row>
                <Col sm={2}>
                <FormGroup>
                    <ControlLabel>Armor Class</ControlLabel>
                    <FormControl
                    name="armor_class"
                    type="number"
                    placeholder="Enter monster's AC"
                    onChange={(e) => changeMonster('armor_class','none', e.target.value, false)}
                    defaultValue={monster.armor_class}
                    />
                </FormGroup>
                </Col>

                <Col sm={2}>
                <FormGroup>
                    <ControlLabel>Hit Points</ControlLabel>
                    <FormControl
                    name="hit_points"
                    type="number"
                    placeholder="Enter monster's HP"
                    onChange={(e) => changeMonster('hit_points','none', e.target.value, false)}
                    defaultValue={monster.hit_points}
                    />
                </FormGroup>
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={2}>
                <FormGroup>
                    <ControlLabel>Hit Dice</ControlLabel>
                    <FormControl
                    name="hit_dice"
                    type="text"
                    placeholder="Enter monster's HD"
                    onChange={(e) => changeMonster('hit_dice','none', e.target.value, false)}
                    defaultValue={monster.hit_dice}
                    />
                </FormGroup>
                </Col>

                <Col sm={2}>
                <FormGroup>
                    <ControlLabel>Speed</ControlLabel>
                    <FormControl
                    name="speed"
                    type="text"
                    placeholder="Enter monster's speed"
                    onChange={(e) => changeMonster('speed','none', e.target.value, false)}
                    defaultValue={monster.speed}
                    />
                </FormGroup>
                </Col>
            </Row>
        </CollapsableSection>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => <CombatSection innerRef={ref} {...props}/>);