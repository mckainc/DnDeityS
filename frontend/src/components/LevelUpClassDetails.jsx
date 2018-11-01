import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import LevelUpScores from '../components/LevelUpScores'
import Well from 'react-bootstrap/lib/Well';

class LevelUpClassdetails extends Component {
    constructor(props) {
        super(props);

        let rolledHp = 0;
        let Hitdie = 12;
        let level = 20;
        var temp;
        
       if(level >= 17){
            temp = 6;
        } else if(level >= 13){
            temp = 5;
        } else if(level >= 9){
            temp = 4;
        } else if(level >= 5){
            temp = 3;
        } else {
            temp = 2;
        }

       let profBonus = temp;

        this.state = {
            rolledHp,
            Hitdie,
            level: 5,
            profBonus,
        }

    }

    diceRoller = (Hitdie) => {
       let state = this.state;
       
      var temp = Math.floor(Math.random() * (this.state.Hitdie)) + 1;
       console.log(temp);
       if(temp < state.Hitdie/2){
           temp = state.Hitdie/2;
       }
     this.setState({rolledHp: temp});
    }

    //add button for raw die rolls

    render() {
        const { currentClass } = this.props;
        const { character } = this.props;
        const { loaded } = this.props;

        return ( 
            <div>  
                <Well>
                        <p>Roll For Health: </p>
                        <Button onClick={this.diceRoller}>d{this.state.Hitdie}</Button>
                        <p>{this.state.rolledHp}</p>
                        
                        <p>Profecincy Bonuse</p>
                        <p>{this.state.profBonus}</p>

                        <p>Ability Score Improvements</p>
                            <LevelUpScores changeCharacter={this.changeCharacter} character={character} loaded={loaded}/>
                        <p>New Class Feacture</p>


                        <p>Spell slots</p>


                </Well>
            </div>
        );
    }
}

export default LevelUpClassdetails;