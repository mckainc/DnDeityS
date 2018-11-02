import React, { Component } from 'react';

// components
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/lib/ToggleButton';
import CollapsableSection from '../../components/CollapsableSection';
import ClassDetails from './ClassDetails';

import './ClassSection.css';

class ClassSection extends Component {
	constructor(props) {
		super(props);

		const currentClass = props.loaded ? props.character.class : 'none';

		this.state = {
				currentClass,
		}
	}
	
	handleClassChange = (e) => {
		this.setState({ currentClass: e });
		this.props.changeCharacter('class', e);
		//this.props.changeCharacter('hitDie', this.state.currentClass.description.hit_die, true);
		//console.log()

		// reset proficiency choices
		this.props.changeCharacter('class_proficiency_choices', 'none');
	}

  render() {
		console.log(this.props.classes);
		//console.log(this.props.classes.get(this.state.currentclass))
		const { classes } = this.props;
		if (classes.size === 0) {
			return <div></div>
		}
    return (
      <div className="ClassSection" ref={this.props.innerRef}>
        <CollapsableSection title="Class" open={true}>
          <ToggleButtonGroup
						value={this.state.currentClass}
						type="radio"
						name="class-options"
						onChange={this.handleClassChange}
					>
            {classes.valueSeq().map(currentClass => (
							<ToggleButton value={currentClass.name}>{currentClass.name}</ToggleButton>
						))}
          </ToggleButtonGroup>
					{this.state.currentClass !== 'none' &&
						<ClassDetails
							currentClass={this.props.classes.get(this.state.currentClass)}
							changeCharacter={this.props.changeCharacter}
							loaded={this.props.loaded}
							character={this.props.character}
						/>}
        </CollapsableSection>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => <ClassSection innerRef={ref} {...props}/>);