const Card = require('./card')

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

    hit(playerId) {
        const player = this.players.find(elem => elem.getPlayerId === playerId);
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

    stand(playerId) {
        const player = this.players.find(elem => elem.getPlayerId === playerId);
        player.isStand = true;
        player.updatePlayer();
        this.moveWinner(player);
        this.#arrayOfPlayerId.splice(this.#arrayOfPlayerId.indexOf(player.getPlayerId), 1)
        this.defineWinner();
        this.setNextPlayerId();
        this.checkEndGame();
    }


}