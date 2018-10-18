package com.example.speed.Model;

public class Player {

    private String playerID;
    private Deck drawPile;
    private Pile extraPile;
    private Hand hand;
    private int cardsRemaining;


    public Player(String playerID) {
        this.playerID = playerID;
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

    public int getCardsRemaining() {
        return hand.getSize() + drawPile.getSize();
    }
}
