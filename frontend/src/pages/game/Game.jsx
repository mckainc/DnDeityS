import React, { Component } from 'react';
import axios from 'axios';

// types
import { Map, List } from 'immutable';
import serverURL from '../../objects/url.js';
import { APP_CLUSTER, APP_KEY } from '../../objects/keys';
import Pusher from 'pusher-js';
import RaceType from '../../objects/RaceType';

// components
import MapGrid from '../../pages/map-maker/MapGrid';
import GameToolbar from './GameToolbar';
import InitiativeRequest from './InitiativeRequest';
import CharacterSheetSidebar from './CharacterSheetSidebar';
import Initiative from './Initiative';
import { Col, Row, DropdownButton, MenuItem } from 'react-bootstrap';
import Notes from '../../components/Notes';
import CharacterSheetHeader from './CharacterSheetHeader';
import InGameMonsterEditor from './InGameMonsterEditor';

class Game extends Component {
  constructor(props) {
    super(props);
    this.changeCharacter = this.changeCharacter.bind(this);

    this.state = {
      map: new Map(),
      characters: new Map(),
      x: 25,
      y: 25,
      loaded: false,
      showNoteModal: false,
      showInitiativeRequest: false,
      showInitiativeModal: false,
      initiativeList: new List(),
      active_character: -1,
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

        this.setState({ map, x, y });
      }).then(response => {
      server.get('/monsters')
      .then((response) => {
        let monsters = new Map();
        response.data.forEach(payload => {
          const monster = new RaceType(payload[1], payload[2]);
          monsters = monsters.set(monster.name, monster);
        });
        this.setState({ monsters, loaded: true });
      });
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

    const characterId = sessionStorage.getItem('character_id');
    if (characterId === '-1') {
      // DM, subscribe to initiative results
      channel.bind('initiative-response', data => {
        if (!this.state.showInitiativeModal) { return; }
        const char = characterArr.find(c => `${c.id}` === data.characterId);
        char.initiative = data.initiative;

        const initiativeList = this.state.initiativeList.push(char);
        this.setState({ initiativeList });
      })
    } else {
      // Player, subscribe to initiative requests
      channel.bind('initiative-request', () => {
        this.setState({ showInitiativeRequest: true });
      })
    }
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

  hideModal = () => {
    this.setState({ showInitiativeModal: false, initiativeList: new List() });
  }

  hideNotes = () => {
    this.setState({showNoteModal: false});
  }

  showNotes = () => {
    this.setState({showNoteModal: true});
  }

  sendInitiativeRequest = () => {
    const server = axios.create({
      baseURL: serverURL,
    });

    const json = {
      channel: sessionStorage.getItem('channel'),
      event: 'initiative-request',
      message: {}
    }

    server.post('/pushmessage', JSON.stringify(json));
    this.setState({ showInitiativeModal: true });
  }

  sendInitiativeResponse = (initiative) => {
    const server = axios.create({
      baseURL: serverURL,
    });

    const json = {
      channel: sessionStorage.getItem('channel'),
      event: 'initiative-response',
      message: {
        characterId: sessionStorage.getItem('character_id'),
        initiative,
      }
    }

    server.post('/pushmessage', JSON.stringify(json));
    this.setState({ showInitiativeRequest: false });
  }
  
  changeCharacter(eventKey) {
    // console.log("Update character to: " + eventKey);
    this.setState({
      active_character: eventKey
    });
  }

  selectTile = (selectedX, selectedY) => {
    this.setState({ selectedX, selectedY });
  }

  changeTile = (selectedTile) => {
    this.setState({ selectedTile });
  }

  editTile = (x, y, type, data) => {
    const { map } = this.state;
    let newMap = map;
    if (!newMap.has(x)) {
      newMap = newMap.set(x, new Map());
    }
    let tile = {};
    if (newMap.get(x).has(y)) {
      tile = newMap.get(x).get(y);
    }
    tile[type] = data;
    newMap = newMap.set(x, newMap.get(x).set(y, tile));

    this.setState({ map: newMap });
  }

  render() {
    const { monsters, selectedTile } = this.state;
    const characterId = sessionStorage.getItem('character_id');

    if (!this.state.loaded) {
      return <div className="Game" />
    }
    // console.log(this.state);

    return (
      <div className="Game">
        {this.state.showInitiativeRequest && <InitiativeRequest sendInitiativeResponse={this.sendInitiativeResponse} /> }
        {this.state.showInitiativeModal && <Initiative initiativeList={this.state.initiativeList} hideModal={this.hideModal} />}
        <GameToolbar characterId={characterId} sendInitiativeRequest={this.sendInitiativeRequest} />
        {characterId != -1 ? (<Col md={10} mdPush={1}><CharacterSheetHeader id={characterId}/></Col>) : (<div/>)}
        <Row>
          <Col md={9}>
            <MapGrid
              characters={this.state.characters}
              x={this.state.x}
              y={this.state.y}
              map={this.state.map}
              playing={true}
              moveEvent={this.moveEvent}
              selectedX={this.state.selectedX}
              selectedY={this.state.selectedY}
              editTile={this.editTile}
              selectedTool='edit'
              selectedLayer='monsters'
              selectedTile={selectedTile}
              selectTile={this.selectTile}
            />
          </Col>
          <Col md={3}>
            {characterId != -1 ? (
              <CharacterSheetSidebar id={characterId}/>
            ) : (
              <div>
                <DropdownButton title="Characters">
                  {this.state.characters.map((character) => (
                    <MenuItem key={character.id} eventKey={character.id} onSelect={this.changeCharacter}>{character.character}</MenuItem>
                  ))}
                </DropdownButton>
                {this.state.active_character != -1 && (<CharacterSheetSidebar dmMode={true} id={this.state.active_character}/>)}
              </div>
            )}
          </Col>
        </Row>
        <Row>
        {characterId == -1 ? (
          <div>
            <Col md={10} mdPush={1}>
              <InGameMonsterEditor
                monsters={monsters}
                editTile={this.editTile}
                map={this.state.map}
                selectedX={this.state.selectedX}
                selectedY={this.state.selectedY}
              />
            </Col>
          </div>
        ) : (<div/>)}
        </Row>
      </div>
    );
  }
}

export default Game;