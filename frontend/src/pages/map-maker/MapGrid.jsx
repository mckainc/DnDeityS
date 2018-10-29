import React, { PureComponent } from 'react';

// components
import MapTile from './MapTile';

import { Row } from 'react-bootstrap';

import './MapGrid.css';

class MapGrid extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isMouseDown: false,
    }
  }

  onMouseDown = () => { this.setState({ isMouseDown: true })}

  onMouseUp = () => { this.setState({ isMouseDown: false })}

  render() {
    const { selectedTile, selectedTool, x, y } = this.props;

    const rows = new Array(parseInt(y));
    const cols = new Array(parseInt(x));

    return (
      <div className="MapGrid" onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
        {
          Array.from(rows).map(() => 
            <div className="row">
              {Array.from(cols).map(() => (
                <MapTile selectedTile={selectedTile} isMouseDown={this.state.isMouseDown} selectedTool={selectedTool}/>
              ))}
            </div>
          )
        }
      </div>
    )
  }
}

export default MapGrid;
