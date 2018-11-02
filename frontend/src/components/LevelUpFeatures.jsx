import React, { Component } from 'react';

// components


//import './RaceSection.css';

class LevelUpFeatures extends Component {
	constructor(props) {
		super(props);

		//const levelUpStuff = props.loaded ? props.levelUpStuff : 'none';

		this.state = {
				//levelUpStuff: levelUpStuff,
		}
	}
	

  render() {
        const { levelUpStuff } = this.props;
        
		if (levelUpStuff.size === 0) {
			return <div></div>
		}
    return (
      <div>
            <b>Abilities</b>
            {levelUpStuff.valueSeq().map(feature => (<p><b>{feature.name}</b><br/>{feature.description.desc}</p>))}
            
      </div>
    );
  }
}

export default LevelUpFeatures;