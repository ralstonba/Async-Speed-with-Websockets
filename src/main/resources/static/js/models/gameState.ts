namespace Models{
    export interface GameState {
        oppNumCardsHand: number;            // Need to know how many cards to show in opp hand
        oppNumCardsRemaining: number;
        oppHandStale: boolean
        playCard1: Models.Card;
        playCard2: Models.Card;
        playOptions: Models.Card[];
        player: Player;
    }
}