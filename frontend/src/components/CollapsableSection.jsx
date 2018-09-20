import React, { PureComponent } from 'react';
import Collapse from 'react-bootstrap/lib/Collapse';

class CollapsableSection extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            open: props.open,
        }
    }

    toggleCollapse = () => {
        this.setState({ open: !this.state.open });
    }

    render() {
        return (
            <div>
                <h2 onClick={this.toggleCollapse}>
                    {this.props.title + " "}
                    {this.state.open ?
                        <i className="fas fa-caret-down"></i> :
                        <i className="fas fa-caret-right"></i>
                    }
                </h2>
                <Collapse in={this.state.open}>
                    <div>{this.props.children}</div>
                </Collapse>
            </div>
        )
    }
}

export default CollapsableSection;
