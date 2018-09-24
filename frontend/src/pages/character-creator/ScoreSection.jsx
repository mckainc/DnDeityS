import React, { Component } from 'react';

// components
import { Col, Radio, Row } from 'react-bootstrap';

import AbilityScore from '../../components/AbilityScore';
import CollapsableSection from '../../components/CollapsableSection';

const abilityScores = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']

class ScoreSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      manual: true,
    }
  }

  setManual(manual) {
    console.log(manual)
    this.setState({ manual });
  }

  render() {
    const { manual } = this.state;
    return (
      <div className="ScoreSection">
        <CollapsableSection title="Ability Scores" open={true}>
          <b>Score Generation Method:</b>
          <Radio checked={manual} name="methodGroup" onClick={() => this.setManual(true)}>Manual</Radio>
          <Radio checked={!manual} name="methodGroup" onClick={() => this.setManual(false)}>Point Buy</Radio>
          <Row>
            {abilityScores.map(score => (
              <Col xs={3} md={2}><AbilityScore type={score}/></Col>
            ))}
          </Row>
        </CollapsableSection>
      </div>
    );
  }
}

export default ScoreSection;