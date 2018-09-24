import React, { Component } from 'react';

// components
import Panel from 'react-bootstrap/lib/Panel'

class AbilityScore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modifier: -1,
    }
  }

  updateModifier = (e) => {
    const score = e.target.value;
    const newModifier = Math.ceil((score - 10) / 2)
    this.setState({ modifier: newModifier });
  }

  render() {
    const { type } = this.props;
    const { modifier } = this.state;
    return (
      <div className="AbilityScore">
        <b>{type}</b>
        <Panel>
          <Panel.Body>
            <input type="number" name={`${type}-value`} id={type} defaultValue={8} onChange={this.updateModifier}/>
          </Panel.Body>
        </Panel>
        {modifier >= 0 && <p>{`+${modifier}`}</p>}
        {modifier < 0 && <p>{modifier}</p>}
      </div>
    );
  }
}

export default AbilityScore;