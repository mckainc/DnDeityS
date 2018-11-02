import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/lib/ToggleButton';

import LevelUpFeatDetails from './LevelUpFeatDetails'


class LevelUpFeats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            feat: 'none'
        }
    }

    handleFeatChange = (e) => {
		this.setState({ feat: e });
	}
    
    render() {
        const { feats } = this.props;
        console.log(feats);
		if (feats.size === 0) {
			return <div></div>
		}
        
        return ( 
            <div>  
                 <ToggleButtonGroup
						value={this.state.feat}
						type="radio"
						name="feat-options"
						onChange={this.handleFeatChange}
					>
						{feats.valueSeq().map(feat => (
							<ToggleButton value={feat.name}>{feat.name}</ToggleButton>
						))}
                    </ToggleButtonGroup>
					{this.state.feat !== 'none' &&
						<LevelUpFeatDetails
							feat={this.props.feats.get(this.state.feat)}
							changeCharacter={this.props.changeCharacter}
							loaded={this.props.loaded}
							character={this.props.character}
						/>}
            </div>
        );
    }
}

export default LevelUpFeats;