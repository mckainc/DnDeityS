import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// components
import { Panel, Button, Col } from 'react-bootstrap';

class MapListItem extends Component {
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
    const { map } = this.props;
    if (this.state.redirect) {
      return <Redirect to = {'/MapMaker/' + map.id}/>
    }
    return (
      <div className="MapListItem">
        <Col sm={4}>
          <Panel>
            <Panel.Heading>{map.name}</Panel.Heading>
            <Panel.Body>
              <p><b>Height: </b>{map.height}</p>
              <p><b>Width: </b>{map.width}</p>
              <Button onClick={this.handleClick}>Edit</Button>
              <Button bsStyle="danger" onClick={() => this.props.deleteMap(map.id)}>Delete</Button>
            </Panel.Body>
          </Panel>
        </Col>
      </div>
    )
  }
}

export default MapListItem;
