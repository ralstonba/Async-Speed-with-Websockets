namespace Models {
    export interface GameState {
        opponentDecksize: number;
        opponentHandSize: number;
        opponentHandStale: boolean;
        playOptions: Card[];
        player: Player;
        availableCards: Card[];
    }
}