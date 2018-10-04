import React, { Component } from 'react';

// types
import { Map } from 'immutable';

// components
import CollapsableSection from '../../../components/CollapsableSection';
import EquipmentList from './EquipmentList';
import Inventory from './Inventory';

import { Row, Col } from 'react-bootstrap';

import './EquipmentSection.css';

const getArrayFromMap = (map) => {
  const arr = [];
  Array.from(map.toArray()).forEach(value => {
    const obj = {};
    obj.name = value.name;
    if (value.hasOwnProperty('quantity')) obj.quantity = value.quantity;
    arr.push(obj);
  });
  return arr;
}

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
    this.props.changeCharacter('inventory', getArrayFromMap(newInventory));
  }

  changeQuantity = (item, amount) => {
    const { inventory } = this.state;
    const newItem = Object.assign({}, item);
    if (typeof newItem.quantity === 'undefined') {
      if (amount === -1) return;
      newItem.quantity = 2;
    } else {
      newItem.quantity += amount;
      if (newItem.quantity < 1) newItem.quantity = 1;
    }
    const newInventory = inventory.set(newItem.name, newItem);
    this.setState({ inventory: newInventory });
    this.props.changeCharacter('inventory', getArrayFromMap(newInventory));
  }

  removeItem = (item) => {
    const { inventory } = this.state;
    if (!inventory.has(item.name)) return;
    const newInventory = inventory.delete(item.name);
    this.setState({ inventory: newInventory });
    this.props.changeCharacter('inventory', getArrayFromMap(newInventory));
  }

  render() {
    return (
      <div ref={this.props.innerRef}>
        <CollapsableSection title="Equipment" open={true}>
            <Row>
              <Col xs={8} md={5}>
                <EquipmentList equipment={this.props.equipment} />
              </Col>
              <Col xs={8} md={5}>
                <Inventory
                  addItemToInventory={this.addItemToInventory}
                  changeQuantity={this.changeQuantity}
                  inventory={this.state.inventory}
                  removeItem={this.removeItem}
                />
              </Col>
            </Row>
        </CollapsableSection>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => <EquipmentSection innerRef={ref} {...props}/>);
