const path = require('path');

const Koa = require('koa');
const serve = require('koa-static');
const Router = require('@koa/router');

const Game = require("./data/game.js");
const Player = require("./data/player.js");

const PORT = 3300
const app = new Koa();

const players = [new Player(0, 'Alice'), new Player(1, 'Joe'), new Player(2, 'Hugh')];
let game = new Game(players);

const router = new Router();

router.get('/players', (ctx, next) => {
    try {
        ctx.body = game
    } catch (e) {
        console.log(e);
        ctx.status = 500;
    }
});

router.post('/hit', (ctx, next) => {
    try {
        game.hit(game.acitvePlayerId);

        ctx.body = game;

    } catch (e) {
        console.log(e);
        ctx.status = 500;
    }
})

router.post('/stand', (ctx, next) => {
    try {
        game.stand(game.acitvePlayerId);

        ctx.body = game;
    } catch (e) {
        console.log(e);
        ctx.status = 500;
    }

})

router.post('/restart', (ctx, next) => {
    try {
        for (const player of players) {
            player.resertPlayer();
        }

        game = new Game(players);

        ctx.body = game;

    } catch (e) {
        console.log(e);
        ctx.status = 500;
    }
})

app.use(serve(path.join(__dirname, '../public/static')));
app.use(router.routes())

app.listen(PORT);
