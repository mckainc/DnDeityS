import React, { Component } from 'react';
import { Button } from 'react-bootstrap';


class LevelUpClassdetails extends Component {
    constructor(props) {
        super(props);

        let rolledHp = 0;
        let Hitdie = props.loaded ? props.currentClass.description.hit_die : 2;
        let level = props.loaded ? props.character.description.level : 5;
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

    
    render() {
        const { character } = this.props;
        const { loaded } = this.props;
        const { currentClass } = this.props;
        
        console.log(character.class);
        return ( 
            <div>  
                
                        <p>Roll For Health: </p>
                        <Button onClick={this.diceRoller}>d{this.state.Hitdie}</Button>
                        <p>{this.state.rolledHp}</p>
                        
                        <p>Proficiency Bonus</p>
                        <p>{this.state.profBonus}</p>

                                     
            </div>
        );
    }
}

export default LevelUpClassdetails;