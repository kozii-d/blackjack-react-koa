module.exports = class Card {
    #name = null;
    #suit = null;
    #weight = null;
    constructor(name, suit, weight) {
        this.#name = name;
        this.#suit = suit;
        this.#weight = weight
    }



    get getCardName() {
        return this.#name;
    }
    get getCardSuit() {
        return this.#suit;
    }
    get getCardWeight() {
        return this.#weight;
    }

    setCardWeight(weight) {
        this.#weight = weight;
    }

    toJSON() {
        return {
            name: this.getCardName,
            suit: this.getCardSuit,
            weight: this.getCardWeight
        }
    }
}