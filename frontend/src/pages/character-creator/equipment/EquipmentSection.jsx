import React, { Component } from 'react';

// types
import { Map } from 'immutable';

// components
import CollapsableSection from '../../../components/CollapsableSection';
import EquipmentList from './EquipmentList';
import Inventory from './Inventory';

import { Grid, Row, Col } from 'react-bootstrap';

class EquipmentSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inventory: new Map(),
    }
  }

  addItemToInventory = (item) => {
    const { inventory } = this.state;
    if (inventory.has(item.name)) return;
    const newInventory = inventory.set(item.name, item);
    this.setState({ inventory: newInventory });
  }

  removeItem = (item) => {
    const { inventory } = this.state;
    if (!inventory.has(item.name)) return;
    const newInventory = inventory.delete(item.name);
    this.setState({ inventory: newInventory });
  }

  render() {
    return (
      <div>
        <CollapsableSection title="Equipment" open={true}>
            <Row>
              <Col xs={8} md={5}>
                <EquipmentList/>
              </Col>
              <Col xs={8} md={5}>
                <Inventory addItemToInventory={this.addItemToInventory} inventory={this.state.inventory} removeItem={this.removeItem}/>
              </Col>
            </Row>
        </CollapsableSection>
      </div>
    );
  }
}

export default EquipmentSection;
