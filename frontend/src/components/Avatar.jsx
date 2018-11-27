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
    const { file, selected, onPress } = this.props;
    const { name } = this.state;
    const path = require("../textures/avatars/" + file);
    return (
      <div className="Avatar">
        <image class="img-thumbnail" src={path} alt={name}/>
        <button type="button" class="btn btn-default btn-block" onClick={onPress}/>
      </div>
    );
  }
}

export default Avatar;