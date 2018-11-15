package com.example.speed.Model;

public class Player {

    private String playerID;
    private Deck drawPile;
    private Pile extraPile;
    private Hand hand;
    private boolean handStale;
    private int cardsRemaining;

    public void init(String playerID) {
        this.playerID = playerID;
        this.drawPile = new Deck();
        this.extraPile = new Pile();
        this.hand = new Hand();
        this.handStale = false;
        this.cardsRemaining = getCardsRemaining();
    }

    public String getPlayerID() {
        return playerID;
    }

    public Deck getDrawPile() {
        return drawPile;
    }

    public void setDrawPile(Deck drawPile) {
        this.drawPile = drawPile;
    }

    public Pile getExtraPile() {
        return extraPile;
    }

    public void setExtraPile(Pile extraPile) {
        this.extraPile = extraPile;
    }

    public Hand getHand() {
        return hand;
    }

    public void setHand(Hand hand) {
        this.hand = hand;
    }

    public boolean isHandStale() {
        return handStale;
    }

    public void setHandStale(boolean handStale) {
        this.handStale = handStale;
    }

    public int getCardsRemaining() {
        return hand.getSize() + drawPile.getSize();
    }

    public void setCardsRemaining(int cardsRemaining) {
        this.cardsRemaining = cardsRemaining;
    }
}
