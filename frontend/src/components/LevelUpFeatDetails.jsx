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
                 <p>Name: {feat.description.name}</p>
                 <p>Requierments: {feat.description.PreReq}</p>
                 <p>{feat.description.Description.header}</p>
                 <p>{feat.description.Description.bonus1}</p>
                 <p>{feat.description.Description.bonus2}</p>
                 <p>{feat.description.Description.bonus3}</p>

            </div>
        );
    }
}

export default LevelUpFeatDetails;