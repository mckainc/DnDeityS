import React, { Component } from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel, Panel } from 'react-bootstrap';

// components
import CollapsableSection from '../../components/CollapsableSection';



class DescriptionSection extends Component {
	constructor(props) {
		super(props);

        const name = props.loaded ? props.monster.name : 'none';
        const size = props.loaded ? props.monster.size : 'none';
        const type = props.loaded ? props.monster.type : 'none';
        const subtype = props.loaded ? props.monster.subtype : 'none';
        const alignment = props.loaded ? props.monster.alignment : 'none';
        const challenge_rating = props.loaded ? props.monster.challenge_rating : 'none';

		this.state = {
                name: name,
                size: size,
                type: type,
                subtype: subtype,
                alignment: alignment,
                challenge_rating: challenge_rating,
		}
	}
	
	handleChange = (e) => {
	
	}

  render() {
    const { changeMonster, monster } = this.props;
    return (
      <div className="DescriptionSection" ref={this.props.innerRef}>
        <CollapsableSection title="Description" open={true}>
            <Panel>
            <Row>
                <Col sm={2}>
                <FormGroup>
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                    name="name"
                    type="text"
                    placeholder="Enter monster's name"
                    onChange={(e) => changeMonster('name','none', e.target.value, false)}
                    defaultValue={monster.name}
                    />
                </FormGroup>
                </Col>

                <Col sm={2}>
                <FormGroup>
                    <ControlLabel>Size</ControlLabel>
                    <FormControl
                    name="size"
                    type="text"
                    placeholder="Enter monster's size"
                    onChange={(e) => changeMonster('size','none', e.target.value, false)}
                    defaultValue={monster.size}
                    />
                </FormGroup>
                </Col>

                <Col sm={2}>
                <FormGroup>
                    <ControlLabel>Type</ControlLabel>
                    <FormControl
                    name="type"
                    type="text"
                    placeholder="Enter monster's type..."
                    onChange={(e) => changeMonster('type','none', e.target.value, false)}
                    defaultValue={monster.type}
                    />
                </FormGroup>
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm={2}>
                <FormGroup>
                    <ControlLabel>Subtype</ControlLabel>
                    <FormControl
                    name="subtype"
                    type="text"
                    placeholder="Enter monster's subtype if any"
                    onChange={(e) => changeMonster('subtype','none', e.target.value, false)}
                    defaultValue={monster.subtype}
                    />
                </FormGroup>
                </Col>

                <Col sm={2}>
                <FormGroup>
                    <ControlLabel>Alignment</ControlLabel>
                    <FormControl
                    name="alignment"
                    type="text"
                    placeholder="Enter monster's alignment"
                    onChange={(e) => changeMonster('alignment','none', e.target.value, false)}
                    defaultValue={monster.alignment}
                    />
                </FormGroup>
                </Col>

                <Col sm={2}>
                <FormGroup>
                    <ControlLabel>Challenge Rating</ControlLabel>
                    <FormControl
                    name="challenge_rating"
                    type="number"
                    placeholder="Enter monster's challenge rating"
                    onChange={(e) => changeMonster('challenge_rating','none', e.target.value, false)}
                    defaultValue={monster.challenge_rating}
                    />
                </FormGroup>
                </Col>
            </Row>
            </Panel>
        </CollapsableSection>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => <DescriptionSection innerRef={ref} {...props}/>);