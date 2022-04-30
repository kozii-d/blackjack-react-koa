const Router = require("@koa/router");
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");

const Game = require("../data/game");
const Player = require("../data/player");
const router = new Router();
const data = require('../data/index');

let game = data.game;
const players = data.players;

const SECRET_KEY = 'OCHEN_SECRETNO';

let games = {};

const authorizationMiddleware = (ctx, next) => {
    const token = ctx.header['Authorization']

    if (!token) {
        ctx.status = 401;

        return;
    }

    let session = null;

    try {
        session = jwt.verify(token, SECRET_KEY);
    } catch (e) {
        ctx.status = 401;
        ctx.body = {error: e}
    }

    if (!session) {
        ctx.status = 401;

        return;
    }

    ctx.state.session = session;

    return next();
}

const checkGame = (ctx, next) => {
    const session = ctx.state.session

    if (!games[session.id]) {
        ctx.status = 401;

        return ;
    }

    ctx.state.game = game[session.id];

    return next();
}

const getGameController = (ctx) => {
    ctx.body = ctx.state.game;
}

router.post('/login', (ctx) => {
    const players = ctx.request.body // массив с именами игроков
    // const players = ['Alice' , 'Joe', 'Hugh']
    // todo: валидировать входящие данные. Массив ли это? Массив ли это строк? Не пустой ли массив? node-input-validator
    // ctx.status = 422; // вернуть в случае некоретных данных

    const session = {
        id: uuidv4()
    };
    const token = jwt.sign(session, SECRET_KEY);
    const game = new Game(players.map(name => new Player(uuidv4(), name))); // todo: разобраться с id игроков

    games[session.id] = game;

    ctx.body = {
        token,
        game
    }
})

// router.get('/game', authorizationMiddleware, checkGame, getGameController);


const errorResponse = (ctx, code = 500, message = 'Internal error') => {
    ctx.body = {
        message
    };
    ctx.status = code;
}
const successResponse = (ctx, data) => {
    ctx.body = data;
    ctx.status = 200;
}

router.get('/game', (ctx) => {
    try {
        successResponse(ctx, game);
    } catch (e) {
        errorResponse(ctx, 500, e.message)
    }
});

router.post('/hit', (ctx) => {
    try {
        game.hit(game.acitvePlayerId);
        successResponse(ctx, game);
    } catch (e) {
        errorResponse(ctx, 500, e.message)
    }
})

router.post('/stand', (ctx) => {
    try {
        game.stand(game.acitvePlayerId);
        successResponse(ctx, game);
    } catch (e) {
        errorResponse(ctx, 500, e.message)
    }
})

router.post('/restart', (ctx) => {

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