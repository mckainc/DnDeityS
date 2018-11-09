import React, { Component } from 'react';

// components
import { FormControl, Panel } from 'react-bootstrap';

class Avatar extends Component {
  constructor(props) {
    super(props);
    const { file } = this.props;

    let new_name = file.replace(/_/g, " ").slice(0, file.lastIndexOf("."));

    this.state = {
      name: new_name,
    }
  }

  render() {
    const { file, selected } = this.props;
    const { name } = this.state;
    return (
      <div className="Avatar">
        <b>{name}</b>
        <div class={selected ? ("panel panel-primary") : ("panel panel-default")}>
          <image src={`../../${file}`} class="img-thumbnail" alt={name}/>
        </div>
      </div>
    );
  }
}

export default Avatar;