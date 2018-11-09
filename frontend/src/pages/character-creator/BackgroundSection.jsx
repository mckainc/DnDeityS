import React, { Component } from 'react';

// components
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import CollapsableSection from '../../components/CollapsableSection';
import BackgroundDetails from './BackgroundDetails';

// import './RaceSection.css';

class BackgroundSection extends Component {
	constructor(props) {
		super(props);

		let background = props.loaded ? props.character.description.background : 'none';

		if (typeof background === 'undefined') { background = 'none'; }

		this.state = {
				background,
		}
	}
	
	handleBackgroundChange = (e) => {
		this.setState({ background: e });
		this.props.changeCharacter('background', e, true);

		// reset choices
		this.props.changeCharacter('background_specialty', '', true);
		this.props.changeCharacter('background_language1', '', true);
		this.props.changeCharacter('background_language2', '', true);
	}

  render() {
		const { backgrounds } = this.props;
		if (backgrounds.size === 0) {
			return <div></div>
    }
    return (
      <div className="BackgroundSection" ref={this.props.innerRef}>
        <CollapsableSection title="Background" open={true}>
          <ToggleButtonGroup
						value={this.state.background}
						type="radio"
						name="background-options"
						onChange={this.handleBackgroundChange}
					>
						{backgrounds.valueSeq().map(background => (
							<ToggleButton value={background.name}>{background.name}</ToggleButton>
            ))}
          </ToggleButtonGroup>
					{this.state.background !== 'none' &&
						<BackgroundDetails
							background={this.props.backgrounds.get(this.state.background)}
							changeCharacter={this.props.changeCharacter}
							loaded={this.props.loaded}
							character={this.props.character}
						/>}
        </CollapsableSection>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => <BackgroundSection innerRef={ref} {...props}/>);