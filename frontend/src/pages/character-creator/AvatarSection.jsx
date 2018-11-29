import React, { Component } from 'react';

// components
import { Col, Radio, Row } from 'react-bootstrap';

import CollapsableSection from '../../components/CollapsableSection';
import Avatar from '../../components/Avatar';
import './AvatarSection.css';

class AvatarSection extends Component {
  constructor(props) {
    super(props);
    let avatar = props.loaded ? props.character.avatar : 'none';

    const fs = require('fs');
    let avatar_list = [
      'temp_avatar.png', 'dragonborn_female.png', 'dragonborn_male.png', 'dwarf_female.png', 'dwarf_male.png',
      'elf_female.png', 'elf_male.png','gnome_female.png', 'gnome_male.png', 'halfling_female.png',
      'halfling_male.png', 'half_elf_female.png', 'half_elf_male.png', 'half_orc_female.png',
      'half_orc_male.png', 'human_female.png', 'human_male.png', 'tiefling_female.png', 'tiefling_male.png'
    ]

    let current = avatar_list.indexOf(avatar);
    if (current < 0) {
      current = 0;
    }

    this.state = {
      avatars: avatar_list,
      current: current,
    }
  }

  updateAvatar = (avatar_name) => {
    const { avatars, current } = this.state;

    let index = avatars.indexOf(avatar_name);

    this.setState({ current : index });
    this.forceUpdate();
    this.props.changeCharacter('avatar', avatar_name);
  }

  render() {
    const { avatars, current } = this.state;
    const current_src = require("../../textures/avatars/" + avatars[current]);
    return (
      <div className="AvatarSection" ref={this.props.innerRef}>
        <CollapsableSection title="Avatars" open={true}>
          <h4>Current Avatar</h4>
          <Row>
            <div class="col-sm-2">
              <img class="img-thumbnail" src={current_src} alt={current_src}/>
            </div>
          </Row>
          <Row>
            <div class="panel panel-default">
              <div class="panel-body">
                {avatars.map((avatar, index) => (
                  index === current ? (
                    <Col xs={2} md={1}><Avatar file={avatar} selected={true} onPress={(e) => this.updateAvatar(avatar, e)}/></Col>
                  ) : (
                    <Col xs={2} md={1}><Avatar file={avatar} selected={false} onPress={(e) => this.updateAvatar(avatar, e)}/></Col>
                  )
                ))}
              </div>
            </div>
          </Row>
        </CollapsableSection>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => <AvatarSection innerRef={ref} {...props}/>);