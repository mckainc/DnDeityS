import React, { Component } from 'react';
import { Row, Col, Panel, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

// components
import AbilityScore from '../../components/AbilityScore';
import CollapsableSection from '../../components/CollapsableSection';

const abilityScores = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']

class AbilityScoreSection extends Component {
	constructor(props) {
		super(props);

    const strength = props.loaded ? props.monster.strength : 'none';
    const dexterity = props.loaded ? props.monster.dexterity : 'none';
    const constitution = props.loaded ? props.monster.constitution : 'none';
    const intelligence = props.loaded ? props.monster.intelligence : 'none';
    const wisdom = props.loaded ? props.monster.wisdom : 'none';
    const charisma = props.loaded ? props.monster.charisma : 'none';

		this.state = {
            strength: strength,
            dexterity: dexterity,
            constitution: constitution,
            intelligence: intelligence,
            wisdom: wisdom,
            charisma: charisma,
		}
	}

  render() {
    const { changeMonster, monster } = this.props;
    return (
      <div className="AbilityScores" ref={this.props.innerRef}>
        <CollapsableSection title="Ability Score" open={true}>
        <Row> 
            <Col xs={2} md={1}>
                <Panel>
                  <Panel.Body>
                      <FormGroup>
                        <ControlLabel>STR</ControlLabel>
                        <FormControl 
                          bsClass="abilitybox" 
                          type="number" 
                          name="strength" 
                          onChange={(e) => changeMonster('description','strength',e.target.value,true)}
                          defaultValue={monster.strength}
                        />
                      </FormGroup>
                  </Panel.Body>
                </Panel>
            </Col>

            <Col xs={2} md={1}>
                <Panel>
                  <Panel.Body>
                      <FormGroup>
                        <ControlLabel>DEX</ControlLabel>
                        <FormControl 
                          bsClass="abilitybox" 
                          type="number" 
                          name="dexterity" 
                          onChange={(e) => changeMonster('description','dexterity',e.target.value,true)}
                          defaultValue={monster.dexterity}
                        />
                      </FormGroup>
                  </Panel.Body>
                </Panel>
            </Col>

            <Col xs={2} md={1}>
                <Panel>
                  <Panel.Body>
                      <FormGroup>
                        <ControlLabel>CON</ControlLabel>
                        <FormControl 
                          bsClass="abilitybox" 
                          type="number" 
                          name="constitution" 
                          onChange={(e) => changeMonster('description','constitution',e.target.value,true)}
                          defaultValue={monster.constitution}
                        />
                      </FormGroup>
                  </Panel.Body>
                </Panel>
            </Col>

            <Col xs={2} md={1}>
                <Panel>
                  <Panel.Body>
                      <FormGroup>
                        <ControlLabel>INT</ControlLabel>
                        <FormControl 
                          bsClass="abilitybox" 
                          type="number" 
                          name="intelligence" 
                          onChange={(e) => changeMonster('description','intelligence',e.target.value,true)}
                          defaultValue={monster.intelligence}
                        />
                      </FormGroup>
                  </Panel.Body>
                </Panel>
            </Col>

            <Col xs={2} md={1}>
                <Panel>
                  <Panel.Body>
                      <FormGroup>
                        <ControlLabel>WIS</ControlLabel>
                        <FormControl 
                          bsClass="abilitybox" 
                          type="number" 
                          name="wisdom" 
                          onChange={(e) => changeMonster('description','wisdom',e.target.value,true)}
                          defaultValue={monster.wisdom}
                        />
                      </FormGroup>
                  </Panel.Body>
                </Panel>
            </Col>

            <Col xs={2} md={1}>
                <Panel>
                  <Panel.Body>
                      <FormGroup>
                        <ControlLabel>CHA</ControlLabel>
                        <FormControl 
                          bsClass="abilitybox" 
                          type="number" 
                          name="charisma" 
                          onChange={(e) => changeMonster('description','charisma',e.target.value,true)}
                          defaultValue={monster.charisma}
                        />
                      </FormGroup>
                  </Panel.Body>
                </Panel>
            </Col>
          </Row>
        </CollapsableSection>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => <AbilityScoreSection innerRef={ref} {...props}/>);