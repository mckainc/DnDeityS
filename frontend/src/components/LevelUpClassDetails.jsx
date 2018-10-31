import React, { Component } from 'react';
import { Button } from 'react-bootstrap';


import Well from 'react-bootstrap/lib/Well';

class LevelUpClassdetails extends Component {
    constructor(props) {
        super(props);

        let rolledHp = 0;
        let Hitdie = 12;
        let raw = 0;

        this.state = {
            rolledHp,
            Hitdie,
            raw,
        }
    }

    profCalc() {
        const { raw } = this.state
    }

    diceRoller = (Hitdie) => {
       let state = this.state;
       
      var temp = Math.floor(Math.random() * (this.state.Hitdie)) + 1;
       console.log(temp);
       if(temp < Hitdie/2){
           temp = Hitdie/2;
       }
     this.setState({rolledHp: temp});
    }

    render() {
        const { currentClass } = this.props;
        const { character } = this.props;
        
        return ( 
            <div>  
                <Well>
                        <p>Roll For Health: </p>
                        <Button onClick={this.diceRoller}>d{this.state.Hitdie}</Button>
                        <p>{this.state.rolledHp}</p>
                        <p>Profecincy Bonuse</p>
                        <p></p>

                        <p>New Class Feacture</p>

                        <p>Spell slots</p>


                </Well>
            </div>
        );
    }
}

export default LevelUpClassdetails;