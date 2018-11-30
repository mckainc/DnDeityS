//React Stuff
import React, { Component } from 'react';
import { FormGroup, FormControl, Panel, ControlLabel } from 'react-bootstrap';
import Draggable from 'react-draggable';
import axios from 'axios';
import serverURL from '../objects/url.js';
import '../pages/game/Initiative'
//css
//import './Notes.css';
//import './Initiative.css';

class Notes extends Component {
  constructor(props) {
    super(props);

    this.handleShowP1 = this.handleShowP1.bind(this);
    this.handleCloseP1 = this.handleCloseP1.bind(this);

    this.state = {
      showP1: false,//is modal being shown right now
      characterId: null,
      character: { description: {} },
      loaded: false,
      buff: 0,
    }
  }

  //Loading
  componentWillMount() {
    const server = axios.create({
      baseURL: serverURL,
    });

    //characterId must be passed as a prop for this to work 
    //I think I need all the data or I will tots wipe a character
    const characterId = this.props.characterId;
    if (typeof characterId !== 'undefined') {
      this.setState({ characterId });
      server.get('/character/' + characterId)
        .then(response => {
          const character = {};
          character.race = response.data[2];
          character.class = response.data[3];
          character.name = response.data[4];
          character.ability_scores = JSON.parse(response.data[8]);
          character.inventory = JSON.parse(response.data[10]);
          character.spells = JSON.parse(response.data[13]);
          character.description = JSON.parse(response.data[14]);
          character.exp = response.data[5];
          character.charId = this.state.characterId;
          character.avatar = response.data[15];
          character.notes = response.data[16];

          const choices = JSON.parse(response.data[11]);
          character.race_language_choice = choices.race.language;
          character.race_proficiency_choice = choices.race.proficiency;
          character.race_trait_choice = choices.race.trait;
          character.class_proficiency_choices = choices.class;
          this.setState({ character, loaded: true });
        })
    }
  }

  //Saving
  saveCharacter = () => {
    const { character } = this.state;
    const server = axios.create({
      baseURL: serverURL,
    });

    const userId = this.state.characterId;
    character['user_id'] = userId;

    if (this.state.characterId !== null) {
      server.patch('/character/' + this.state.characterId, JSON.stringify(character));
      return;
    }

    // Create character
    server.post('/character', JSON.stringify(character))
      .then(response => {
        const characterId = response.data.CharacterId;
        this.setState({ characterId });
      })

      //this.props.hideNotes();
  }

  //Update notes field
  changeNotes = (value) => {
    
    var temp = this.state.buff;
    console.log("character buffer: " + temp);
    temp++;
    const { character } = this.state;
    character['notes'] = value;
    if(temp >= 30){
      this.saveCharacter();
      temp = 0;
    }
    this.setState({buff: temp});
  }

  //Displays Modal
  handleShowP1() {
    this.setState({ showP1: true});
  }  

  //Hides Modal
  handleCloseP1() {
    this.setState({ showP1: false});
    this.saveCharacter();
  }

  //this.props.hideNotes

  render() {
    console.log(this.state.characterId);
    console.log(this.state.character.notes);
    const character  = this.state.character;

    return (
      <Draggable>
        <Panel className="Initiative">
          <Panel.Heading>
            <a onClick={this.props.hideNotes} href="#!"><i className="fas fa-times"></i></a>
          </Panel.Heading>
          <Panel.Body>
            
            <FormGroup>
               <ControlLabel>Notes</ControlLabel>
              <FormControl
                name="notes"
                className="drag-cancel"
                componentClass="textarea"
                placeholder="Notes ..."
                onChange={(e) => this.changeNotes(e.target.value)}
                value={character.notes}
              />
            </FormGroup>
            
          </Panel.Body>
        </Panel>
        </Draggable>
    );
  }
}

export default Notes;

//onChange={(e) => changeCharacter('backstory', e.target.value, true)}
//defaultValue={character.description.backstory}
/*

 

*/