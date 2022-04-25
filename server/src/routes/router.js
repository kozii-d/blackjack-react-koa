const Router = require("@koa/router");

const Game = require("../data/game");
const router = new Router();
const data = require('../data/index');

let game = data.game;
const players = data.players;


const errorResponse = (ctx, code = 500, message = 'Internal error') => {
    ctx.body = {
        message
    };
    ctx.status = code;
}
const successResponse = (ctx, data) => {
    ctx.body = {
        data
    };
    ctx.status = 200;
}

router.get('/players', (ctx, next) => {
    try {
        successResponse(ctx, game);
    } catch (e) {
        errorResponse(ctx, 500, e.message)
    }
});

router.post('/hit', (ctx, next) => {
    try {
        game.hit(game.acitvePlayerId);
        successResponse(ctx, game);
    } catch (e) {
        errorResponse(ctx, 500, e.message)
    }
})

router.post('/stand', (ctx, next) => {
    try {
        game.stand(game.acitvePlayerId);
        successResponse(ctx, game);
    } catch (e) {
        errorResponse(ctx, 500, e.message)
    }
})

router.post('/restart', (ctx, next) => {

    try {
        for (const player of players) {
            player.resertPlayer();
        }
        game = new Game(players);

        successResponse(ctx, game);
    } catch (e) {
        errorResponse(ctx, 500, e.message)
    }
})

module.exports = router;