package com.example.speed.Model;

public class SanitizedGameState {
    private Player player;
    private Card[] playOptions;
    private int opponentHandSize;
    private int opponentDeckSize;
    private boolean opponentHandStale;
    private GameState gameState;

    public SanitizedGameState() {
    }

    public SanitizedGameState(String playerID, SpeedInstance speed) {
        this.player = speed.getPlayerMap().get(playerID);
        this.playOptions = speed.getPlayOptions();
        this.gameState = speed.getGameState();
        for (String id : speed.getPlayerMap().keySet()) {
            if (id != playerID) {
                Player opponent = speed.getPlayerMap().get(id);
                this.opponentHandSize = opponent.getHand().getSize();
                this.opponentDeckSize = opponent.getDrawPile().getSize();
                this.opponentHandStale = opponent.isHandStale();
                break;
            }
        }
    }
}
