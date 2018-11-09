import { Map } from 'immutable';

const dirt = require('../textures/tiles/dirt.png');
const grass = require('../textures/tiles/grass.png');
const stone = require('../textures/tiles/stone.png');
const wood = require('../textures/tiles/wood.png');

let tiles = new Map();
tiles = tiles.set('dirt', dirt);
tiles = tiles.set('grass', grass);
tiles = tiles.set('stone', stone);
tiles = tiles.set('wood', wood);

export default tiles;