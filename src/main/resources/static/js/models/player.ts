namespace Models {
    export interface Player {
        cardsRemaining: number;
        drawPile: Card[];
        extraPile: Card[];
        hand: { cards: Card[] };
        handStale: boolean;
        playerID: string;
        myHand: Array<Card>;
        myNumCardsRemaining: number;
        myHandStale: boolean;
        didWin: boolean;
    }
}