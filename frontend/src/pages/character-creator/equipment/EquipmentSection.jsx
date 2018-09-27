import React, { Component } from 'react';

//components
import CollapsableSection from '../../../components/CollapsableSection';
import EquipmentList from './EquipmentList';
import Inventory from './Inventory';

import { Grid, Row, Col } from 'react-bootstrap';

class EquipmentSection extends Component {
  render() {
    return (
      <div>
        <CollapsableSection title="Equipment" open={true}>
            <Row>
              <Col xs={8} md={5}>
                <EquipmentList/>
              </Col>
              <Col xs={8} md={5}>
                <Inventory/>
              </Col>
            </Row>
        </CollapsableSection>
      </div>
    );
  }
}

export default EquipmentSection;
