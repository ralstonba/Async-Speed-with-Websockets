var Models;
(function (Models) {
    var Card = /** @class */ (function () {
        function Card(rank, suit) {
            this.rank = rank;
            this.suit = suit;
            this.suit = suit;
            this.rank = rank;
            this.src = this.srcUrlBuilder(rank, suit);
        }
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
            "img/2SPADES.png";
            return "img/" + (ranks.indexOf(rank) + 1) + suit + ".png";
        };
        return Card;
    }());
    Models.Card = Card;
})(Models || (Models = {}));
//# sourceMappingURL=card.js.map