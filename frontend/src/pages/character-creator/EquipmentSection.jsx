import React, { Component } from 'react';

//components
import CollapsableSection from '../../components/CollapsableSection';
import EquipmentList from './EquipmentList';

class EquipmentSection extends Component {
  render() {
    return (
      <div>
        <CollapsableSection title="Equipment" open={true}>
          <EquipmentList/>
        </CollapsableSection>
      </div>
    );
  }
}

export default EquipmentSection;
