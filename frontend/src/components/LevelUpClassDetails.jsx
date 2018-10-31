import React, { PureComponent } from 'react';
import { Button } from 'react-bootstrap';


import Well from 'react-bootstrap/lib/Well';

class LevelUpClassdetails extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            rolledHp: 0,
            Hitdie: 0,
        }
    }

    DiceRoller() {
        this.setState({rolledHp: Math.floor(Math.random() * (this.state.Hitdie)+1)});
        if(this.state.rolledHp < this.state.Hitdie/2){
            this.setState({rolledHp: this.state.Hitdie/2});
        }
    }

    render() {
        const { currentClass } = this.props;
        const { character } = this.props;
        
        return ( 
            <div>  
                <Well>
                        <p>Roll For Health: </p>
                        <Button onClick={this.DiceRoller()}>d{this.state.Hitdie}</Button>
                        <p>Profecincy Bonuse</p>

                        <p>New Class Feacture</p>

                        <p>Spell slots</p>


                </Well>
            </div>
        );
    }
}

export default LevelUpClassdetails;