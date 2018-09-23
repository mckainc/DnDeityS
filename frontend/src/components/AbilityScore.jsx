import React, { Component } from 'react';

class AbilityScore extends Component {
  render() {
    const { type } = this.props;
    return (
      <div className="AbilityScore">
        <b>{type}</b>
        <input type="number" name={`${type}-value`} id={type}/>
      </div>
    );
  }
}

export default AbilityScore;