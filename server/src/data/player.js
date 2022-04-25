
module.exports = class Player {
    #id = null;
    #score = 0;
    #name = null;
    cards = [];
    isLose = false;
    isStand = false;

    constructor(id, name) {
        this.#id = id;
        this.#name = name;
        this.updatePlayer();
    }

    toJSON() {
        return {
            id: this.getPlayerId,
            score: this.getPlayerScore,
            name: this.getPlayerName,
            cards: this.cards,
            isLose: this.isLose,
            isStand: this.isStand
        }
    }

    updatePlayer() {
        this.setScore();
        this.checkAce();
        this.checkWin();
    }

    resertPlayer() {
        this.cards = [];
        this.#score = 0;
        this.isLose = false;
        this.isStand = false;
    }

    checkAce() {
        this.cards.forEach(card => {
            if (card.getCardName === 'A' && this.#score > 21) {
                card.setCardWeight(1);
            }
        })
        this.setScore();

    }

    checkWin() {
        if (this.#score === 21) {
            // this.isWinner = true;
            this.isStand = true;
        }
        if (this.#score > 21) {
            this.isLose = true;
            this.isStand = true;
        }
    }

    setScore() {
       this.#score = this.cards.reduce((accumulator, currentValue) => {
           return accumulator + currentValue.getCardWeight;
       }, 0)
    }

    get getPlayerScore() {
        return this.#score;
    }

    get getPlayerName() {
        return this.#name;
    }
    get getPlayerId() {
        return this.#id;
    }

}