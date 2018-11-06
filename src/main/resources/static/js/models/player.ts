namespace Models {
    export interface Player {
        cardsRemaining: number;
        drawPile: Card[];
        extraPile: Card[];
        hand: Card[];
        handStale: boolean;
        playerID: string;
    }
}