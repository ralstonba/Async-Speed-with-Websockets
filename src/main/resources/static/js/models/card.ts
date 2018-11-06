namespace Models {
    export class Card {

        src: string;
        id: string;
        stack ?: number;

        constructor(private rank: string, private suit: string) {
            this.suit = suit;
            this.rank = rank;
            this.src = this.srcUrlBuilder(rank, suit);
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

            "img/2SPADES.png";

            return `img/${ranks.indexOf(rank) + 1}${suit}.png`;
        }
    }
}