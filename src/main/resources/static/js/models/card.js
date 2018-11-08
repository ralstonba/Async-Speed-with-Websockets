var Models;
(function (Models) {
    var Card = /** @class */ (function () {
        function Card(theRank, theSuit) {
            this.theRank = theRank;
            this.theSuit = theSuit;
            this._suit = theSuit;
            this._rank = theRank;
            this.src = this.srcUrlBuilder(theRank, theSuit);
        }
        Object.defineProperty(Card.prototype, "suit", {
            get: function () {
                return this._suit;
            },
            set: function (theSuit) {
                this._suit = theSuit;
            },
            enumerable: true,
            configurable: true
        });
        Card.prototype.srcUrlBuilder = function (rank, suit) {
            var ranks = ["ACE",
                "TWO",
                "THREE",
                "FOUR",
                "FIVE",
                "SIX",
                "SEVEN",
                "EIGHT",
                "NINE",
                "TEN",
                "JACK",
                "QUEEN",
                "KING"];
            return "img/" + (ranks.indexOf(rank) + 1) + suit + ".png";
        };
        Object.defineProperty(Card.prototype, "rank", {
            get: function () {
                return this._rank;
            },
            set: function (theRank) {
                this._rank = theRank;
            },
            enumerable: true,
            configurable: true
        });
        Card.prototype.getJSON = function () {
            var thisCard = {
                suit: this._suit,
                rank: this._rank
            };
            return JSON.stringify(thisCard);
        };
        return Card;
    }());
    Models.Card = Card;
})(Models || (Models = {}));
//# sourceMappingURL=card.js.map