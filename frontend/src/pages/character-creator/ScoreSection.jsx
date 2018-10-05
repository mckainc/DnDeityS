import React, { Component } from 'react';

// components
import { Col, Radio, Row } from 'react-bootstrap';

import AbilityScore from '../../components/AbilityScore';
import CollapsableSection from '../../components/CollapsableSection';

const abilityScores = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']

class ScoreSection extends Component {
  constructor(props) {
    super(props);

    const points = props.loaded ? props.character.ability_scores : ['8', '8', '8', '8', '8', '8'];

    this.state = {
      manual: true,
      pointTotal: 27,
      points,
    }
  }

  updatePoints = (score, type) => {
    const { points } = this.state;
    const index = abilityScores.indexOf(type);

    let pointTotal = 27; // max amount of points
    points[index] = score;

    // calculate amount of points left
    for(let i = 0; i < abilityScores.length;i++) {
      pointTotal = pointTotal - (points[i] - 8);
      // scores above 13 are more expensive
      if(points[i] > 13) pointTotal--;
      if(points[i] > 14) pointTotal--;
    }

    this.setState({ points, pointTotal});
    this.forceUpdate();
    this.props.changeCharacter('ability_scores', points);
  }

  setManual(manual) {
    this.setState({ manual });
  }

  render() {
    const { manual, pointTotal } = this.state;
    return (
      <div className="ScoreSection" ref={this.props.innerRef}>
        <CollapsableSection title="Ability Scores" open={true}>
          <b>Score Generation Method:</b>
          <Radio checked={manual} name="methodGroup" onClick={() => this.setManual(true)}>Manual</Radio>
          <Radio checked={!manual} name="methodGroup" onClick={() => this.setManual(false)}>Point Buy</Radio>
          {!manual &&
            <div>
              <h3 class={pointTotal < 0 ? "text-danger" : ""}>
                Points Remaining: {pointTotal}
              </h3>
            </div>
          }
          <Row>
            {abilityScores.map((score, index) => (
              <Col xs={2} md={1}><AbilityScore type={score} score={this.state.points[index]} manual={manual} updatePoints={this.updatePoints}/></Col>
            ))}
          </Row>
        </CollapsableSection>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => <ScoreSection innerRef={ref} {...props}/>);