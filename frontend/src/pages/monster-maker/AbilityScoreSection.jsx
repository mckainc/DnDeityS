import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

// components
import AbilityScore from '../../components/AbilityScore';
import CollapsableSection from '../../components/CollapsableSection';

const abilityScores = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']

class AbilityScoreSection extends Component {
	constructor(props) {
		super(props);

        let points = props.loaded ? props.monster.ability_scores : ['8', '8', '8', '8', '8', '8'];
         if (points === null) points = ['8', '8', '8', '8', '8', '8'];


		this.state = {
            points,
		}
	}
	
	updatePoints = (score, type) => {
        const { points } = this.state;
        const index = abilityScores.indexOf(type);

        points[index] = score;

        this.setState({ points });
        this.forceUpdate();
        this.props.changeMonster('ability_scores', 'none', points);
    }

  render() {
    
    return (
      <div className="AbilityScore" ref={this.props.innerRef}>
        <CollapsableSection title="Ability Score" open={true}>
        <Row>
            
            {abilityScores.map((score, index) => (
              <Col xs={2} md={1}><div className="boxes"><AbilityScore type={score} score={this.state.points[index]} manual={true} updatePoints={this.updatePoints}/></div></Col>
            ))}
            
          </Row>
        </CollapsableSection>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => <AbilityScoreSection innerRef={ref} {...props}/>);