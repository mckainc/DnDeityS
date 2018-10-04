import React, { Component } from 'react';

// components
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/lib/ToggleButton';
import CollapsableSection from '../../components/CollapsableSection';
import ClassDetails from './ClassDetails';

class ClassSection extends Component {
	constructor(props) {
		super(props);

		this.state = {
				currentClass: 'none',
		}
	}
	
	handleClassChange = (e) => {
		let currentClass = this.props.classes.get(e);
		this.setState({ currentClass });
		this.props.changeCharacter('class', currentClass.name);

		// reset proficiency choices
		this.props.changeCharacter('class_proficiency_choices', 'none');
	}

  render() {
		const { classes } = this.props;
    return (
      <div className="ClassSection" ref={this.props.innerRef}>
        <CollapsableSection title="Class" open={true}>
          <ToggleButtonGroup
						value={this.state.currentClass.name}
						type="radio"
						name="class-options"
						onChange={this.handleClassChange}
					>
            {classes.valueSeq().map(currentClass => (
							<ToggleButton value={currentClass.name}>{currentClass.name}</ToggleButton>
						))}
          </ToggleButtonGroup>
					{this.state.currentClass !== 'none' && <ClassDetails currentClass={this.state.currentClass} changeCharacter={this.props.changeCharacter}/>}
        </CollapsableSection>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => <ClassSection innerRef={ref} {...props}/>);