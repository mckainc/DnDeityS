import React, { Component } from 'react';

// components
import { Col, Row } from 'react-bootstrap';

import AbilityScore from '../../components/AbilityScore';
import CollapsableSection from '../../components/CollapsableSection';

const abilityScores = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']

class ScoreSection extends Component {
  render() {
    return (
      <div className="ScoreSection">
        <CollapsableSection title="Ability Scores" open={true}>
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