const Player = require("./player");
const Game = require("./game");
const { v4: uuidv4 } = require('uuid');

const players = [new Player(uuidv4(), 'Alice'), new Player(uuidv4(), 'Joe'), new Player(uuidv4(), 'Hugh')];
let game = new Game(players);

module.exports = {
    game,
    players
}