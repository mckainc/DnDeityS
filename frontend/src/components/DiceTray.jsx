//React Stuff
import React, { Component } from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl, Form } from 'react-bootstrap';
import Draggable from 'react-draggable';

//css
import './DiceTray.css';
import { Static } from 'react-bootstrap/lib/FormControl';



class DiceTray extends Component {
  constructor(props) {
    super(props);

    this.handleShowP1 = this.handleShowP1.bind(this);
    this.handleCloseP1 = this.handleCloseP1.bind(this);

    this.state = {
      showP1: false,
      result: 0,
      bonus4: 0,
      bonus6: 0,
      bonus8: 0,
      bonus10: 0,
      bonus12: 0,
      bonus20: 0,
      res4: 0,
      res6: 0,
      res8: 0,
      res10: 0,
      res12: 0,
      res20: 0,
      roll4: 1,
      roll6: 1,
      roll8: 1,
      roll10: 1,
      roll12: 1,
      roll20: 1,
    }
  }

  handleShowP1() {
    this.setState({ showP1: true});
  }  

  handleCloseP1() {
    this.setState({ showP1: false});
  }
  
  handleDiceRoll(die, bonus, id, realDie) {
    var roll = Math.floor(Math.random() * (parseInt(die))) + 1;
    var bon = bonus;
    let result = parseInt(roll) + parseInt(bon);
    this.setState({[id]: result});
    this.setState({[realDie]: roll});
  }

  handleChange = event => {

    const re = /^[0-9\b]+$/;
      if (event.target.value === '' || re.test(event.target.value)) {
         this.setState({[event.target.id]: event.target.value})
      }
  }

  render() {

    const pathD4 = "../textures/dice/d4";
    
    return (
      <div className="DiceModal">
        <Button bsSize="xsmall" onClick={this.handleShowP1}>
          Dice
        </Button>

        <Draggable>
          <Modal  show={this.state.showP1} onHide={this.handleCloseP1} backdrop={Static} backdropClassName="nogray">
            <Modal.Header closeButton>
                        <Modal.Title>Dice</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form bsClass="help">
              <FormGroup controlId="bonus4">
                <Button onClick={() => this.handleDiceRoll(4,this.state.bonus4,"res4","roll4")}>
                  <img src={require("../textures/dice/d4/" + this.state.roll4 + ".png")}/>
                </Button>
                <p>+</p>
                <FormControl
                  bsClass="bonusField"
                  autoFocus
                  type="text"
                  value={this.state.bonus4}
                  onChange={this.handleChange}
                />
                <p>{this.state.res4}</p>
               </FormGroup>

              <FormGroup controlId="bonus6">
                <Button onClick={() => this.handleDiceRoll(6,this.state.bonus6, "res6","roll6")}>
                <img src={require("../textures/dice/d6/" + this.state.roll6 + ".png")}/>
                </Button>
                <p>+</p>
                <FormControl
                  bsClass="bonusField"
                  autoFocus
                  type="text"
                  pattern="[0-9]*"
                  value={this.state.bonus6}
                  onChange={this.handleChange}
                />
                <p>{this.state.res6}</p>
               </FormGroup>

               <FormGroup controlId="bonus8">
                <Button onClick={() => this.handleDiceRoll(8,this.state.bonus8,"res8","roll8")}>
                <img src={require("../textures/dice/d8/" + this.state.roll8 + ".png")}/>
                </Button>
                <p>+</p>
                <FormControl
                  bsClass="bonusField"
                  autoFocus
                  type="text"
                  pattern="[0-9]*"
                  value={this.state.bonus8}
                  onChange={this.handleChange}
                />
                <p>{this.state.res8}</p>
               </FormGroup>

               <FormGroup controlId="bonus10">
                <Button onClick={() => this.handleDiceRoll(10,this.state.bonus10,"res10","roll10")}>
                <img src={require("../textures/dice/d10/" + this.state.roll10 + ".png")}/>
                </Button>
                <p>+</p>
                <FormControl
                  bsClass="bonusField"
                  autoFocus
                  type="text"
                  pattern="[0-9]*"
                  value={this.state.bonus10}
                  onChange={this.handleChange}
                />
                <p>{this.state.res10}</p>
               </FormGroup>

               <FormGroup controlId="bonus12">
                <Button onClick={() => this.handleDiceRoll(12,this.state.bonus12,"res12","roll12")}>
                  <img src={require("../textures/dice/d12/" + this.state.roll12 + ".png")}/>
                </Button>
                <p>+</p>
                <FormControl
                  bsClass="bonusField"
                  autoFocus
                  type="text"
                  pattern="[0-9]*"
                  value={this.state.bonus12}
                  onChange={this.handleChange}
                />
                <p>{this.state.res12}</p>
               </FormGroup>

               <FormGroup controlId="bonus20">
                <Button onClick={() => this.handleDiceRoll(20,this.state.bonus20,"res20","roll20")}>
                  <img src={require("../textures/dice/d20/" + this.state.roll20 + ".png")}/>
                </Button>
                <p>+</p>
                <FormControl
                  bsClass="bonusField"
                  autoFocus
                  type="text"
                  pattern="[0-9]*"
                  value={this.state.bonus20}
                  onChange={this.handleChange}
                />
                <p>{this.state.res20}</p>
               </FormGroup>

              </Form>
            </Modal.Body>
          </Modal>
        </Draggable>
      </div>
    );
  }
}

export default DiceTray;