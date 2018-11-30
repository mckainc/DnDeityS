import React, { Component } from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel, } from 'react-bootstrap';

// components
import CollapsableSection from '../../components/CollapsableSection';



class ActionsSection extends Component {
	constructor(props) {
		super(props);

		this.state = {

		}
	}
	
	handleChange = (e) => {
	
	}

  render() {
    const { changeMonster, monster } = this.props;
    return (
      <div className="ActionsSection" ref={this.props.innerRef}>
        <CollapsableSection title="Actions" open={true}>
            <Row>
                
            </Row>
        </CollapsableSection>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => <ActionsSection innerRef={ref} {...props}/>);