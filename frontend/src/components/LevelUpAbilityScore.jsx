import React, { Component } from 'react';

// components
import { FormControl, Panel } from 'react-bootstrap';

//import './AbilityScore.css';

class LevelUpAbilityScore extends Component {
  constructor(props) {
    super(props);

    const modifier = Math.ceil((props.score - 10) / 2)

    this.state = {
      modifier,
      score: props.score,
    }
  }

  updateModifier = (e) => {
    let score = e.target.value;
  
    // If using point buy, don't let scores be lower than 8 or higher than 15
    
    if (score < 8) score = 8;
    if (score > 20) score = 20;


    // calculate new modifier
    const modifier = Math.ceil((score - 10) / 2)
    this.setState({ modifier, score });
 
    // recalculate how many points are left
    this.props.updatePoints(score, this.props.type);
  }

  render() {
    const { type } = this.props;
    const { modifier, score } = this.state;
    return (
      <div className="AbilityScore">
        <b>{type}</b>
        <Panel>
          <Panel.Body>
            <FormControl type="number" name={`${type}-value`} id={type} value={score} onChange={this.updateModifier}/>
          </Panel.Body>
        </Panel>
        {modifier >= 0 && <p className="modifier">{`+${modifier}`}</p>}
        {modifier < 0 && <p className="modifier">{modifier}</p>}
      </div>
    );
  }
}

export default LevelUpAbilityScore;