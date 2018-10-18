package com.example.speed.Model;

import com.example.speed.Controller.SpeedController;

import java.util.Map;

public class SpeedInstance {
    private static SpeedInstance ourInstance = new SpeedInstance();

    private Map<String, Player> playerMap;
    private Deck deck;
    private SpeedController speedController;

    private SpeedInstance() {
        speedController = new SpeedController();
        deck = new Deck();
    }

    public static SpeedInstance getInstance() {
        return ourInstance;
    }

    public Map<String, Player> getPlayerMap() {
        return playerMap;
    }

    public void setPlayerMap(Map<String, Player> playerMap) {
        this.playerMap = playerMap;
    }

    public Deck getDeck() {
        return deck;
    }

    public void setDeck(Deck deck) {
        this.deck = deck;
    }

    public SpeedController getSpeedController() {
        return speedController;
    }

    public void setSpeedController(SpeedController speedController) {
        this.speedController = speedController;
    }
}
