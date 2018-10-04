import React, { Component } from 'react';

// types
import { Map } from 'immutable';

// components
import CollapsableSection from '../../../components/CollapsableSection';
import SpellList from './SpellList';
import KnownSpells from './KnownSpells';

import { Row, Col } from 'react-bootstrap';

class SpellSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      knownSpells: new Map(),
    }
  }

  addSpell = (spell) => {
    const { knownSpells } = this.state;
    if (knownSpells.has(spell.name)) return;
    const newSpells = knownSpells.set(spell.name, spell);
    this.setState({ knownSpells: newSpells });
  }

  removeSpell = (spell) => {
    const { knownSpells } = this.state;
    if (!knownSpells.has(spell.name)) return;
    const newSpells = knownSpells.delete(spell.name);
    this.setState({ knownSpells: newSpells });
  }

  render() {
    return (
      <div ref={this.props.innerRef}>
        <CollapsableSection title="Spells" open>
          <Row>
            <Col xs={8} md={5}>
              <SpellList spells={this.props.spells} />
            </Col>
            <Col xs={8} md={5}>
              <KnownSpells
                addSpell={this.addSpell}
                knownSpells={this.state.knownSpells}
                removeSpell={this.removeSpell}
              />
            </Col>
          </Row>
        </CollapsableSection>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => <SpellSection innerRef={ref} {...props}/>);
