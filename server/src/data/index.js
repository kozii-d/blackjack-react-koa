const Player = require("./player");
const Game = require("./game");
const players = [new Player(0, 'Alice'), new Player(1, 'Joe'), new Player(2, 'Hugh')];
let game = new Game(players);

module.exports = {
    game,
    players
}