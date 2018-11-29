import React, { Component } from 'react';
import axios from 'axios';

// types
import { Map } from 'immutable';
import serverURL from '../../objects/url.js';
import { APP_CLUSTER, APP_KEY } from '../../objects/keys';
import Pusher from 'pusher-js';

// components
import MapGrid from '../../pages/map-maker/MapGrid';
import GameToolbar from './GameToolbar';
import CharacterSheetSidebar from './CharacterSheetSidebar';
import { Col } from 'react-bootstrap';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: new Map(),
      characters: new Map(),
      x: 25,
      y: 25,
      loaded: false,
    }
  }

  componentWillMount() {
    const server = axios.create({
      baseURL: serverURL,
    });

    let mapId = localStorage.getItem('map_id');

    server.get('/map/' + mapId)
      .then(response => {
        const tiles = JSON.parse(response.data[6]);
        let map = new Map();
        let x, y;

        // height and width
        y = response.data[4];
        x = response.data[5];

        // parse tile data
        tiles.forEach(tile => {
          if (!map.has(tile.x)) {
            map = map.set(tile.x, new Map());
          }
          map = map.set(tile.x, map.get(tile.x).set(tile.y, tile));
        });

        this.setState({ map, x, y, loaded: true });
      });

    // set characters from sessionStorage
    let characterArr = JSON.parse(sessionStorage.getItem('characters'));
    let characters = new Map();
    let count = 0;
    characterArr.forEach(c => {
      if (typeof c.xval !== 'undefined' && c.xval !== null) {
        characters = characters.set(c.xval + ',' + c.yval, c);
        return;
      }

      while (characters.has(`0,` + count)) { count++; }
      let character = c;
      character.xval = 0;
      character.yval = count;
      characters = characters.set('0,' + count, character);
      count++;
    })

    this.setState({ characters });

    // subscribe to channel
    const pusher = new Pusher(APP_KEY, {
      cluster: APP_CLUSTER
    });

    const code = sessionStorage.getItem('channel');
    const channel = pusher.subscribe(code);

    channel.bind('move-character', data => {
      this.moveCharacter(data.x, data.y, data.character);
    });
  }

  moveCharacter = (x, y, character) => {
    const { characters } = this.state;
    let newCharacters = characters.delete(character.xval + ',' + character.yval);
    character.xval = x;
    character.yval = y;
    newCharacters = newCharacters.set(x + ',' + y, character);
    this.setState({ characters: newCharacters });
  }

  moveEvent = (x, y, character) => {
    if (this.state.characters.has(x + ',' + y)) { return; }
    const server = axios.create({
      baseURL: serverURL,
    });

    const json = {
      channel: sessionStorage.getItem('channel'),
      event: 'move-character',
      message: {
        character,
        x,
        y,
      }
    }

    server.post('/pushmessage', JSON.stringify(json));

    // update character in database
    character.xval = x;
    character.yval = y;
    server.patch('/character/' + character.id, JSON.stringify(character))
  }

  render() {
    const characterId = sessionStorage.getItem('character_id');

    if (!this.state.loaded) {
      return <div className="Game" />
    }

    return (
      <div className="Game">
        <GameToolbar characterId={characterId}/>
        <Col md={9}>
          <MapGrid
            characters={this.state.characters}
            x={this.state.x}
            y={this.state.y}
            map={this.state.map}
            playing={true}
            moveEvent={this.moveEvent}
          />
        </Col>
        <Col md={3}>
          <CharacterSheetSidebar id={characterId}/>
        </Col>
      </div>
    );
  }
}

export default Game;