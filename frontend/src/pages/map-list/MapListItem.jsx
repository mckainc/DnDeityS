import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// components
import { Panel, Button, Col } from 'react-bootstrap';

class MapListItem extends Component {
  render() {
    const { map } = this.props;
    return (
      <div className="MapListItem">
        <Col sm={4}>
          <Panel>
            <Panel.Heading>{map.name}</Panel.Heading>
            <Panel.Body>
              <p><b>Height: </b>{map.height}</p>
              <p><b>Width: </b>{map.width}</p>
              <Button><Link to={'/MapMaker/' + map.id}>Edit</Link></Button>
              <Button bsStyle="danger" onClick={() => this.props.deleteMap(map.id)}>Delete</Button>
            </Panel.Body>
          </Panel>
        </Col>
      </div>
    )
  }
}

export default MapListItem;
