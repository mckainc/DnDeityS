//React Stuff
import React, { Component } from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl, Form } from 'react-bootstrap';
import Draggable from 'react-draggable';

//css
import './DiceTray.css';

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
    }
  }

  handleShowP1() {
    this.setState({ showP1: true});
  }  

  handleCloseP1() {
    this.setState({ showP1: false});
  }
  
  handleDiceRoll(die, bonus, id) {
    var roll = Math.floor(Math.random() * (parseInt(die))) + 1;
    var bon = bonus;
    let result = parseInt(roll) + parseInt(bon);
    this.setState({[id]: result});
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
          <Modal  show={this.state.showP1} onHide={this.handleCloseP1}>
            <Modal.Header closeButton>
                        <Modal.Title>Dice</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form>
              <FormGroup controlId="bonus4">
                <Button onClick={() => this.handleDiceRoll(4,this.state.bonus4,"res4")}>D4</Button>
                <FormControl
                  autoFocus
                  type="text"
                  value={this.state.bonus4}
                  onChange={this.handleChange}
                />
                <p>{this.state.res4}</p>
               </FormGroup>

              <FormGroup controlId="bonus6">
                <Button onClick={() => this.handleDiceRoll(6,this.state.bonus6, "res6")}>D6</Button>
                <FormControl
                  autoFocus
                  type="text"
                  pattern="[0-9]*"
                  value={this.state.bonus6}
                  onChange={this.handleChange}
                />
                <p>{this.state.res6}</p>
               </FormGroup>

               <FormGroup controlId="bonus8">
                <Button onClick={() => this.handleDiceRoll(8,this.state.bonus8,"res8")}>D8</Button>
                <FormControl
                  autoFocus
                  type="text"
                  pattern="[0-9]*"
                  value={this.state.bonus8}
                  onChange={this.handleChange}
                />
                <p>{this.state.res8}</p>
               </FormGroup>

               <FormGroup controlId="bonus10">
                <Button onClick={() => this.handleDiceRoll(10,this.state.bonus10,"res10")}>D10</Button>
                <FormControl
                  autoFocus
                  type="text"
                  pattern="[0-9]*"
                  value={this.state.bonus10}
                  onChange={this.handleChange}
                />
                <p>{this.state.res10}</p>
               </FormGroup>

               <FormGroup controlId="bonus12">
                <Button onClick={() => this.handleDiceRoll(12,this.state.bonus12,"res12")}>D12</Button>
                <FormControl
                  autoFocus
                  type="text"
                  pattern="[0-9]*"
                  value={this.state.bonus12}
                  onChange={this.handleChange}
                />
                <p>{this.state.res12}</p>
               </FormGroup>

               <FormGroup controlId="bonus20">
                <Button onClick={() => this.handleDiceRoll(20,this.state.bonus20,"res20")}>D20</Button>
                <FormControl
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