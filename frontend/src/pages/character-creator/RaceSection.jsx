import React, { Component } from 'react';

// components
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/lib/ToggleButton';
import CollapsableSection from '../../components/CollapsableSection';
import RaceDetails from './RaceDetails';

class RaceSection extends Component {
	constructor(props) {
		super(props);

		this.state = {
				race: 'none',
		}
	}
	
	handleRaceChange = (e) => {
		let race = this.props.races.get(e);
		this.setState({ race });
		this.props.changeCharacter('race', race.name);

		// reset choices
		this.props.changeCharacter('race_language_choice', '');
		this.props.changeCharacter('race_proficiency_choice', '');
		this.props.changeCharacter('race_trait_choice', '');
	}

  render() {
		const { races } = this.props;
    return (
      <div className="RaceSection" ref={this.props.innerRef}>
        <CollapsableSection title="Race" open={true}>
          <ToggleButtonGroup
						value={this.state.race.name}
						type="radio"
						name="race-options"
						onChange={this.handleRaceChange}
					>
						{races.valueSeq().map(race => (
							<ToggleButton value={race.name}>{race.name}</ToggleButton>
						))}
          </ToggleButtonGroup>
					{this.state.race !== 'none' && <RaceDetails race={this.state.race} changeCharacter={this.props.changeCharacter}/>}
        </CollapsableSection>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => <RaceSection innerRef={ref} {...props}/>);