import React, { Component } from 'react';


class LevelUpFeatDetails extends Component {
    constructor(props) {
        super(props);
    }

    handleFeatChange = (e) => {
		this.setState({ feat: e });
	}
    
    render() {
        const { feat } = this.props;
        
        return ( 
            <div>  
                 <p>{feat.description.name}</p>
            </div>
        );
    }
}

export default LevelUpFeatDetails;