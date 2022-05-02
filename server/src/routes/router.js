const Router = require("@koa/router");
const koaBody = require('koa-body');
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require("path");

const Game = require("../data/game");
const Player = require("../data/player");
const router = new Router();

const SECRET_KEY = 'OCHEN_SECRETNO';

let games = {};

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

    ctx.state.game = games[session.id];

    return next();
}

const getGameController = (ctx) => {
    ctx.body = ctx.state.game;
}

const hitAndGetGameController = (ctx) => {
    ctx.state.game.hit(ctx.state.game.acitvePlayerId);
    ctx.body = ctx.state.game;
}

const standAndGetGameController = (ctx) => {
    ctx.state.game.stand(ctx.state.game.acitvePlayerId);
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

router.post('/api/login', koaBody(), (ctx) => {
    const players = ctx.request.body // массив с именами игроков
    // const players = ['Alice' , 'Joe', 'Hugh']
    // todo: валидировать входящие данные. Массив ли это? Массив ли это строк? Не пустой ли массив? node-input-validator
    // ctx.status = 422; // вернуть в случае некоретных данных

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
});


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

router.get('/api/game', authorizationMiddleware, checkGame, getGameController);
router.post('/api/hit', authorizationMiddleware, checkGame, hitAndGetGameController);
router.post('/api/stand', authorizationMiddleware, checkGame, standAndGetGameController);
router.post('/api/restart', authorizationMiddleware, checkGame, restartAndGetGameController);

router.get('/:url', (ctx) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(path.join(__dirname, '../../public/static/index.html'));
})

// router.get('/api/game', (ctx) => {
//     try {
//         successResponse(ctx, game);
//     } catch (e) {
//         errorResponse(ctx, 500, e.message)
//     }
// });


// router.post('/api/hit', (ctx) => {
//     try {
//         game.hit(game.acitvePlayerId);
//         successResponse(ctx, game);
//     } catch (e) {
//         errorResponse(ctx, 500, e.message)
//     }
// })
//
// router.post('/api/stand', (ctx) => {
//     try {
//         game.stand(game.acitvePlayerId);
//         successResponse(ctx, game);
//     } catch (e) {
//         errorResponse(ctx, 500, e.message)
//     }
// })
//
// router.post('/api/restart', (ctx) => {
//
//     try {
//         for (const player of players) {
//             player.resertPlayer();
//         }
//         game = new Game(players);
//
//         successResponse(ctx, game);
//     } catch (e) {
//         errorResponse(ctx, 500, e.message)
//     }
// })

module.exports = router;