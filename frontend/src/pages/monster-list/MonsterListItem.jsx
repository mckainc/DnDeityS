import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// components
import { Panel, Button, Col } from 'react-bootstrap';

class MonsterListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
    }
  }

  handleClick = () => {
    this.setState({ redirect: true });
  }

  render() {
    const { monster } = this.props;
    if (this.state.redirect) {
      return <Redirect to = {'/MonsterMaker/' + monster.id}/>
    }
    return (
      <div className="MapListItem">
        <Col sm={4}>
          <Panel>
            <Panel.Heading>{monster.name}</Panel.Heading>
            <Panel.Body>
              <Button onClick={this.handleClick}>Edit</Button>
              <Button bsStyle="danger" onClick={() => this.props.deleteMonster(monster.id)}>Delete</Button>
            </Panel.Body>
          </Panel>
        </Col>
      </div>
    )
  }
}

export default MonsterListItem;
