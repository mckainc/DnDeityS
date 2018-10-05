import React, { Component } from 'react';

// components
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/lib/ToggleButton';
import CollapsableSection from '../../components/CollapsableSection';
import RaceDetails from './RaceDetails';

import './RaceSection.css';

class RaceSection extends Component {
	constructor(props) {
		super(props);

		const race = props.loaded ? props.character.race : 'none';

		this.state = {
				race: race,
		}
	}
	
	handleRaceChange = (e) => {
		this.setState({ race: e });
		this.props.changeCharacter('race', e);

		// reset choices
		this.props.changeCharacter('race_language_choice', '');
		this.props.changeCharacter('race_proficiency_choice', '');
		this.props.changeCharacter('race_trait_choice', '');
	}

  render() {
		const { races } = this.props;
		if (races.size === 0) {
			return <div></div>
		}
    return (
      <div className="RaceSection" ref={this.props.innerRef}>
        <CollapsableSection title="Race" open={true}>
          <ToggleButtonGroup
						value={this.state.race}
						type="radio"
						name="race-options"
						onChange={this.handleRaceChange}
					>
						{races.valueSeq().map(race => (
							<ToggleButton value={race.name}>{race.name}</ToggleButton>
						))}
          </ToggleButtonGroup>
					{this.state.race !== 'none' &&
						<RaceDetails
							race={this.props.races.get(this.state.race)}
							changeCharacter={this.props.changeCharacter}
							loaded={this.props.loaded}
							character={this.props.character}
						/>}
        </CollapsableSection>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => <RaceSection innerRef={ref} {...props}/>);