namespace Models {
    export class Card {

        constructor(private theRank: string, private theSuit: string) {
            this._suit = theSuit;
            this._rank = theRank;
            this.src = this.srcUrlBuilder(theRank, theSuit);
        }

        _suit: string;
        src: string;
        id: string;
        stack ?: number;

        get suit(): string {
            return this._suit;
        }

        srcUrlBuilder(rank: string, suit: string): string {
            let ranks = ["ACE",
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

            return `img/${ranks.indexOf(rank) + 1}${suit}.png`;
        }

        set suit(theSuit: string) {
            this._suit = theSuit;
        }

        _rank: string;

        get rank(): string {
            return this._rank;
        }

        set rank(theRank: string) {
            this._rank = theRank;
        }

        getJSON(): string {
            let thisCard = {
                suit: this._suit,
                rank: this._rank
            };

            return JSON.stringify(thisCard);
        }
    }
}