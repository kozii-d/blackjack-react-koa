const Router = require("@koa/router");
const koaBody = require('koa-body');
const {Validator} = require('node-input-validator');
const {v4: uuidv4} = require('uuid');
const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require("path");

const Game = require("../data/game");
const Player = require("../data/player");
const router = new Router();

const SECRET_KEY = 'OCHEN_SECRETNO';

let games = {};

// Middlewares
const authorizationMiddleware = (ctx, next) => {
    const token = ctx.header['authorization']

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

        return;
    }

    ctx.state.session = session;

    return next();
}

const checkGame = (ctx, next) => {
    const session = ctx.state.session
    if (!games[session.id]) {
        ctx.status = 401;

        return;
    }

    ctx.state.game = games[session.id];

    return next();
}

// Controllers
const getGameController = (ctx) => {
    ctx.body = ctx.state.game;
}

const hitAndGetGameController = (ctx) => {
    ctx.state.game.hit();
    ctx.body = ctx.state.game;
}

const standAndGetGameController = (ctx) => {
    ctx.state.game.stand();
    ctx.body = ctx.state.game;
}

const restartAndGetGameController = (ctx) => {
    const players = ctx.state.game.players
    for (const player of players) {
        player.resertPlayer();
    }
    const session = ctx.state.session
    ctx.state.game = new Game(players);
    games[session.id] = ctx.state.game;

    ctx.body = ctx.state.game;
}

const loginController = async (ctx) => {
    const players = ctx.request.body // массив с именами игроков
    const v = new Validator({
        names: players
    }, {
        'names': 'required|array',
        'names.*': 'required|string'
    });

    const matched = await v.check();

    if (!matched) {
        ctx.status = 422;

        return;
    }

    const session = {
        id: uuidv4()
    };
    const token = jwt.sign(session, SECRET_KEY);
    const game = new Game(players.map(name => new Player(uuidv4(), name)));

    games[session.id] = game;

    ctx.body = {
        game,
        token
    }
}

const getStaticFilesController = (ctx) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(path.join(__dirname, '../../public/static/index.html'));
}

router.post('/api/login', koaBody(), loginController);
router.get('/api/game', authorizationMiddleware, checkGame, getGameController);
router.post('/api/hit', authorizationMiddleware, checkGame, hitAndGetGameController);
router.post('/api/stand', authorizationMiddleware, checkGame, standAndGetGameController);
router.post('/api/restart', authorizationMiddleware, checkGame, restartAndGetGameController);

router.get('/:url', getStaticFilesController)

module.exports = router;