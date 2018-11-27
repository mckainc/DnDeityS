//React Stuff
import React, { Component } from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl, Form, Row, Col } from 'react-bootstrap';
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
      showP1: false,//is modal being shown right now
      bonus4: 0,//Bonus being added
      bonus6: 0,
      bonus8: 0,
      bonus10: 0,
      bonus12: 0,
      bonus20: 0,
      res4: 0,//Result of rolling dice and adding bonus
      res6: 0,
      res8: 0,
      res10: 0,
      res12: 0,
      res20: 0,
      roll4: 1,//Roll is the first die rolled to determin picture
      roll6: 1,
      roll8: 1,
      roll10: 1,
      roll12: 1,
      roll20: 1,
      num4: 1,//Number of Dice Being rolled
      num6: 1,
      num8: 1,
      num10: 1,
      num12: 1,
      num20: 1,
    }
  }

  //returns 1 for Max roll -1 for Min roll 0 for all other rolls
  theoMaxMin(bonus, num, res, die){
    var Max = parseInt(bonus) + (parseInt(num) * parseInt(die));
    var Min = parseInt(bonus) + parseInt(num);
    if(parseInt(Max) === parseInt(res)){
      return "text-success";
    } else if(parseInt(Min)===parseInt(res)){
      return "text-danger";
    }
    return "";
  }

  //Displays Modal
  handleShowP1() {
    this.setState({ showP1: true});
  }  

  //Hides Modal
  handleCloseP1() {
    this.setState({ showP1: false});
  }
  
  handleDiceRoll(die, bonus, id, realDie, numDie) {
    if(bonus===''){
      bonus = 0;
    }

    var roll = 0;
    if(numDie < 1){
      numDie = 1;
    }
    var d1 = Math.floor(Math.random() * (parseInt(die))) + 1;
    for(var x = 0;x < parseInt(numDie)-1;x++){
       roll = roll + Math.floor(Math.random() * (parseInt(die))) + 1;
    }
    roll = roll + d1;//add the one I took away
    var bon = bonus;
    let result = parseInt(roll) + parseInt(bon);
    this.setState({[id]: result});
    this.setState({[realDie]: d1});//only shows the first die rolled
  }

  handleChange = event => {
    const re = /^[0-9\b]+$/;
      if (event.target.value === '' || re.test(event.target.value)) {
         this.setState({[event.target.id]: event.target.value});
      }
  }


  render() {
    
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
              
                <Row>
                  <Col sm={2}>
                    <Button onClick={() => this.handleDiceRoll(4,this.state.bonus4,"res4","roll4",this.state.num4)}>
                     <img src={require("../textures/dice/d4/" + this.state.roll4 + ".png")}/>
                     </Button>
                   </Col>

                   <Col sm={2}>
                   <FormGroup controlId="num4">
                      <FormControl controlId="num4"
                        bsClass="bonusField"
                        autoFocus
                        type="text"
                        value={this.state.num4}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    </Col>

                   <Col sm={2}>
                     <p>+</p>
                   </Col>

                   <Col sm={2}>
                   <FormGroup controlId="bonus4">
                      <FormControl
                        bsClass="bonusField"
                        autoFocus
                        type="text"
                        value={this.state.bonus4}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    </Col>

                    <Col sm={2}>
                      <p class={this.theoMaxMin(
                        this.state.bonus4,
                        this.state.num4,
                        this.state.res4,
                        4
                      )}>
                        {this.state.res4}
                      </p>
                    </Col>
                </Row>
              

              <FormGroup controlId="bonus6">
                <Row>
                <Col sm={2}>
                <Button onClick={() => this.handleDiceRoll(6,this.state.bonus6, "res6","roll6",this.state.num6)}>
                <img src={require("../textures/dice/d6/" + this.state.roll6 + ".png")}/>
                </Button>
                </Col>

                <Col sm={2}>
                   <FormGroup controlId="num6">
                      <FormControl controlId="num6"
                        bsClass="bonusField"
                        autoFocus
                        type="text"
                        value={this.state.num6}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    </Col>

                   <Col sm={2}>
                     <p>+</p>
                   </Col>

                   <Col sm={2}>
                   <FormGroup controlId="bonus6">
                      <FormControl
                        bsClass="bonusField"
                        autoFocus
                        type="text"
                        value={this.state.bonus6}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    </Col>

                <Col sm={2}>
                <p class={this.theoMaxMin(
                        this.state.bonus6,
                        this.state.num6,
                        this.state.res6,
                        6
                      )}>
                        {this.state.res6}
                      </p>
                </Col>
                </Row>
               </FormGroup>

               <FormGroup controlId="bonus8">
               <Row>
               <Col sm={2}>
                <Button onClick={() => this.handleDiceRoll(8,this.state.bonus8,"res8","roll8",this.state.num8)}>
                <img src={require("../textures/dice/d8/" + this.state.roll8 + ".png")}/>
                </Button>
                </Col>

                <Col sm={2}>
                   <FormGroup controlId="num8">
                      <FormControl controlId="num8"
                        bsClass="bonusField"
                        autoFocus
                        type="text"
                        value={this.state.num8}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    </Col>

                   <Col sm={2}>
                     <p>+</p>
                   </Col>

                   <Col sm={2}>
                   <FormGroup controlId="bonus8">
                      <FormControl
                        bsClass="bonusField"
                        autoFocus
                        type="text"
                        value={this.state.bonus8}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    </Col>

                <Col sm={2}>
                <p class={this.theoMaxMin(
                        this.state.bonus8,
                        this.state.num8,
                        this.state.res8,
                        8
                      )}>
                        {this.state.res8}
                      </p>
                </Col>
                </Row>
               </FormGroup>

               <FormGroup controlId="bonus10">
               <Row>
               <Col sm={2}>
                <Button onClick={() => this.handleDiceRoll(10,this.state.bonus10,"res10","roll10",this.state.num10)}>
                <img src={require("../textures/dice/d10/" + this.state.roll10 + ".png")}/>
                </Button>
                </Col>

                <Col sm={2}>
                   <FormGroup controlId="num10">
                      <FormControl controlId="num10"
                        bsClass="bonusField"
                        autoFocus
                        type="text"
                        value={this.state.num10}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    </Col>

                   <Col sm={2}>
                     <p>+</p>
                   </Col>

                   <Col sm={2}>
                   <FormGroup controlId="bonus10">
                      <FormControl
                        bsClass="bonusField"
                        autoFocus
                        type="text"
                        value={this.state.bonus10}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    </Col>

                <Col sm={2}>
                <p class={this.theoMaxMin(
                        this.state.bonus10,
                        this.state.num10,
                        this.state.res10,
                        10
                      )}>
                        {this.state.res10}
                      </p>
                </Col>
                </Row>
               </FormGroup>

               <FormGroup controlId="bonus12">
               <Row>
               <Col sm={2}>
                <Button onClick={() => this.handleDiceRoll(12,this.state.bonus12,"res12","roll12",this.state.num12)}>
                  <img src={require("../textures/dice/d12/" + this.state.roll12 + ".png")}/>
                </Button>
                </Col>

                <Col sm={2}>
                   <FormGroup controlId="num12">
                      <FormControl controlId="num12"
                        bsClass="bonusField"
                        autoFocus
                        type="text"
                        value={this.state.num12}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    </Col>

                   <Col sm={2}>
                     <p>+</p>
                   </Col>

                   <Col sm={2}>
                   <FormGroup controlId="bonus12">
                      <FormControl
                        bsClass="bonusField"
                        autoFocus
                        type="text"
                        value={this.state.bonus12}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    </Col>

                <Col sm={2}>
                <p class={this.theoMaxMin(
                        this.state.bonus12,
                        this.state.num12,
                        this.state.res12,
                        12
                      )}>
                        {this.state.res12}
                      </p>
                </Col>
                </Row>
               </FormGroup>

               <FormGroup controlId="bonus20">
               <Row>
               <Col sm={2}>
                <Button onClick={() => this.handleDiceRoll(20,this.state.bonus20,"res20","roll20",this.state.num20)}>
                  <img src={require("../textures/dice/d20/" + this.state.roll20 + ".png")}/>
                </Button>
                </Col>

                <Col sm={2}>
                   <FormGroup controlId="num20">
                      <FormControl controlId="num20"
                        bsClass="bonusField"
                        autoFocus
                        type="text"
                        value={this.state.num20}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    </Col>

                   <Col sm={2}>
                     <p>+</p>
                   </Col>

                   <Col sm={2}>
                   <FormGroup controlId="bonus20">
                      <FormControl
                        bsClass="bonusField"
                        autoFocus
                        type="text"
                        value={this.state.bonus20}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    </Col>

                <Col sm={2}>
                <p class={this.theoMaxMin(
                        this.state.bonus20,
                        this.state.num20,
                        this.state.res20,
                        20
                      )}>
                        {this.state.res20}
                      </p>
                </Col>
                </Row>
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