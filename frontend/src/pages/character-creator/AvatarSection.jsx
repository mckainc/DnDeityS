import React, { Component } from 'react';

// components
import { Col, Radio, Row } from 'react-bootstrap';

import CollapsableSection from '../../components/CollapsableSection';
import Avatar from '../../components/Avatar';

class AvatarSection extends Component {
  constructor(props) {
    super(props);

    const fs = require('fs');
    let avatar_list = fs.readdirSync('../../textures/avatars');

    this.state = {
      avatars: avatar_list,
      current: -1,
    }
  }

  updateAvatar = (avatar_name) => {
    const { avatars, current } = this.state;
    
    let index = avatars.indexOf(avatar_name);

    this.setState({ current : index });
    this.forceUpdate();
    this.props.changeCharacter('avatars', current);
  }

  render() {
    const { avatars, current } = this.state;
    return (
      <div className="AvatarSection" ref={this.props.innerRef}>
        <CollapsableSection title="Avatars" open={true}>
          <Row>
            {avatars.map((avatar, index) => (
              index === current ? (
                <Col xs={2} md={1}><Avatar file={avatar} selected={true} onclick={`updateAvatar(${avatar})`}/></Col>
              ) : (
                <Col xs={2} md={1}><Avatar file={avatar} selected={false} onclick={`updateAvatar(${avatar})`}/></Col>
              )
            ))}
          </Row>
        </CollapsableSection>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => <AvatarSection innerRef={ref} {...props}/>);