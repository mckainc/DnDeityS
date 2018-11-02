import React, { Component } from 'react';

// components
import CollapsableSection from '../../components/CollapsableSection';

import './MonsterDetails.css';

class MonsterDetails extends Component {
  abilityScoreString = score => {
    if (typeof score === 'undefined') {
      return 'none';
    }
    const modifier = Math.ceil((score - 10) / 2)
    const sign = (modifier > 0) ? '+' : '';
  
    return `${score} (${sign + modifier})`;
  }

  render() {
    const { monster } = this.props;
    const details = monster.description;
  
    return (
      <div className="MonsterDetails scrollable-list">
        <div className="basic-details">
          <p>{details.type}, {details.alignment}</p>
          <p><b>AC: </b>{details.armor_class}</p>
          <p><b>HP: </b>{details.hit_points}, ({details.hit_dice})</p>
          <p><b>Speed: </b>{details.speed}</p>
        </div>

        <div className="ability-scores">
          <br />
          <p><b>STR: </b>{this.abilityScoreString(details.strength)}</p>
          <p><b>DEX: </b>{this.abilityScoreString(details.dexterity)}</p>
          <p><b>CON: </b>{this.abilityScoreString(details.constitution)}</p>
          <p><b>INT: </b>{this.abilityScoreString(details.intelligence)}</p>
          <p><b>WIS: </b>{this.abilityScoreString(details.wisdom)}</p>
          <p><b>CHA: </b>{this.abilityScoreString(details.charisma)}</p>
        </div>

        <div className="actions">
          <br />
          <p><b>Actions</b></p>
          {details.actions.map(action => (
            <CollapsableSection title={action.name} open={false} small>
              <p><b>Desc: </b>{action.desc}</p>
            </CollapsableSection>
          ))}
        </div>

        {typeof details.special_abilities !== 'undefined' &&
          <div className="special-abilities">
            <br />
            <p><b>Special Abilities</b></p>
            {details.special_abilities.map(ability => (
              <CollapsableSection title={ability.name} open={false} small>
                <p><b>Desc: </b>{ability.desc}</p>
              </CollapsableSection>
            ))}
          </div>
        }
      </div>
    )
  }
}

export default MonsterDetails;