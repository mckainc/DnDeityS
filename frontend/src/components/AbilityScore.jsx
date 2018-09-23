import React, { Component } from 'react';

// components
import Panel from 'react-bootstrap/lib/Panel'

class AbilityScore extends Component {
  render() {
    const { type } = this.props;
    return (
      <div className="AbilityScore">
        <b>{type}</b>
        <Panel>
          <Panel.Body><input type="number" name={`${type}-value`} id={type} defaultValue={8}/></Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default AbilityScore;