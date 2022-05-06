const Card = require('./card')
const mongoose = require("mongoose");

module.exports = class Game {
    #cardsDeck = [];
    players;
    winners = [];
    #idIndex = 0;
    #arrayOfPlayerId = [];
    acitvePlayerId = 0;
    isEndGame = false;

    #suits = ['♣', '♠', '♥', '♦'];
    #highCards = ['J', 'Q', 'K', 'A'];

    constructor(players = []) {
        this.players = players;
        this.fullId();
        this.setNextPlayerId();
        this.createCardsDeck();
        this.firstHand();
    }

    fullId() {
        this.players.forEach(player => {
            this.#arrayOfPlayerId.push(player.getPlayerId);
        })
    }

    checkEndGame() {
        if (!this.#arrayOfPlayerId.length) {
            this.isEndGame = true;
        }
    }

    setNextPlayerId() {
        this.#idIndex = 0;
        this.acitvePlayerId = this.#arrayOfPlayerId[this.#idIndex++];
    }

    createCardsDeck() {
        this.#suits.forEach((suit) => {
            for (let i = 2; i <= 10; i++) {
                this.#cardsDeck.push(new Card(`${i}`, suit, i));
            }
            this.#highCards.forEach(card => {
                this.#cardsDeck.push(new Card(`${card}`, suit, card === 'A' ? 11 : 10));

            })
        });

        this.#cardsDeck = [...this.#cardsDeck, ...this.#cardsDeck, ...this.#cardsDeck, ...this.#cardsDeck];
        this.#cardsDeck = this.#cardsDeck.sort(() => 0.5 - Math.random());
    }

    moveWinner(player) {
        if (player.isStand && !player.isLose) {
            this.winners.push(player);
        }
    }

    defineWinner() {
        if (this.winners.length === 1) {
            return;
        }
        if (this.winners.length > 1) {
            this.winners = this.winners.sort((a, b) => {
                return b.getPlayerScore - a.getPlayerScore;
            });
            this.winners = this.winners.filter(player => player.getPlayerScore === this.winners[0].getPlayerScore);
        }
    }

    firstHand() {
        this.players.forEach(player => {
            player.cards.push(this.#cardsDeck.shift());
            player.cards.push(this.#cardsDeck.shift());
            player.updatePlayer();
            this.moveWinner(player);

            if (player.getPlayerScore === 21) {
                this.#arrayOfPlayerId.splice(this.#arrayOfPlayerId.indexOf(player.getPlayerId), 1);
                this.acitvePlayerId = this.#arrayOfPlayerId[0];
            }
        });
        this.defineWinner();
        this.checkEndGame();
    }

    hit() {
        const player = this.players.find(elem => elem.getPlayerId === this.acitvePlayerId);
        player.cards.push(this.#cardsDeck.shift());
        player.updatePlayer();
        if (player.getPlayerScore === 21) {
            this.stand(this.acitvePlayerId);
        }
        if (player.getPlayerScore > 21) {
            this.#arrayOfPlayerId.splice(this.#arrayOfPlayerId.indexOf(player.getPlayerId), 1);
            this.setNextPlayerId();
        }
        this.defineWinner();
        this.checkEndGame();
    }

    stand() {
        const player = this.players.find(elem => elem.getPlayerId === this.acitvePlayerId);
        player.isStand = true;
        player.updatePlayer();
        this.moveWinner(player);
        this.#arrayOfPlayerId.splice(this.#arrayOfPlayerId.indexOf(player.getPlayerId), 1)
        this.defineWinner();
        this.setNextPlayerId();
        this.checkEndGame();
    }


}

mongoose.connect('mongodb://localhost:27017/blackjack').then(async () => {
    console.log('start');

    const cardSchema = new mongoose.Schema({
        name: String,
        suit: String,
        weight: Number
    });

    cardSchema.methods = {
        getCardName: function () {
            return this.name;
        },
        getCardSuit: function () {
            return this.suit;
        },
        getCardWeight: function () {
            return this.weight;
        },
        setCardWeight: function (weight) {
            this.weight = weight;
            this.parent().parent().save();
        }
    }

    const Card = mongoose.model('Card', cardSchema);

    const playerSchema = new mongoose.Schema({
        score: Number,
        name: String,
        cards: [cardSchema],
        isLose: Boolean,
        isStand: Boolean
    });


    playerSchema.methods = {
        resetPlayer: function () {
            this.cards = [];
            this.score = 0;
            this.isLose = false;
            this.isStand = false;
            this.parent().save();
        },
        setScore: function () {
            this.score = this.cards.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.getCardWeight();
            }, 0);
            this.parent().save();
        },
        getPlayerScore: function () {
            return this.score;
        },
        getPlayerName: function () {
            return this.name;
        },
        // getPlayerId: function () {
        //     return this.id;
        // }
        checkWin: function () {
            if (this.score === 21) {
                this.isStand = true;
            }
            if (this.score > 21) {
                this.isLose = true;
                this.isStand = true;
            }
            this.parent().save();
        },
        checkAce: async function () {
            // if (this.score > 21) {
                console.log(1)
                await this.cards.find((card) => card.getCardName() === 'A').setCardWeight(1);
                // await this.setScore();
            // }
        },
        updatePlayer: async function () {
            await this.setScore();
            await this.checkAce();
            await this.checkWin();
        }

    }

    const Player = mongoose.model('Player', playerSchema);

    const gameSchema = new mongoose.Schema({
        cardsDeck: Array,
        players: [playerSchema],
        winners: Array,
        idIndex: Number,
        arrayOfPlayerId: Array,
        // acitvePlayerId: ObjectId,
        isEndGame: Boolean
    });

    gameSchema.methods.test = function () {
        this.idIndex = this.idIndex * 33;
        this.save();
        console.log(this.idIndex);
    }

    const Game = mongoose.model('Game', gameSchema);

    const game = new Game({
        cardsDeck: [1, 2],
        players: [new Player({
            score: 1,
            name: 'abc',
            cards: [new Card({
                name: 'Q',
                suit: 'Q',
                weight: 10
            }), new Card({
                name: 'A',
                suit: 'A',
                weight: 12
            })],
            isLose: true,
            isStand: true
        })],
        winners: [],
        idIndex: 11,
        arrayOfPlayerId: [1, 2],
        // acitvePlayerId: ObjectId,
        isEndGame: false
    });

    // await game.save();

    const g = await Game.findOne({});
    // await g.players[0].cards[1].setCardWeight(12)
    await g.players[0].checkAce();

});
