import React, { PureComponent } from 'react';

// components
import Well from 'react-bootstrap/lib/Well';

class RaceDetails extends PureComponent {
  render() {
    const { race } = this.props;
    return (
      <div>
        <Well>
          <p><b>Age: </b>{race.description.age}</p>
          <p><b>Alignment: </b>{race.description.alignment}</p>          
          <p><b>Size: </b>{race.description.size}</p>
          <p><b>Speed: </b>{race.description.speed}</p>
          <b>Languages:</b>
          {race.description.languages.map(language => {
            return (<p>- {language.name}</p>);
          })}
          <b>Traits:</b>
          {race.description.traits.map(trait => {
            return (<p>- {trait.name}</p>);
          })}
        </Well>
      </div>
    );
  }
}

export default RaceDetails;