namespace Models{
    export interface GameState {
        oppNumCardsHand: Number;            // Need to know how many cards to show in opp hand
        oppNumCardsRemaining: Number;
        oppHandStale: boolean
        myHand: Array<Models.Card>;
        myNumCardsRemaining: Number;
        myHandStale: boolean;
        playCard1: Models.Card;
        playCard2: Models.Card;
    }
}