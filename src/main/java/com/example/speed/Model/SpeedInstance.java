package com.example.speed.Model;

import com.example.speed.Controller.SpeedController;

import java.util.HashMap;
import java.util.Map;

public class SpeedInstance {
    private static SpeedInstance ourInstance = new SpeedInstance();

    private Map<String, Player> playerMap;
    private Deck deck;
    private Card[] playOptions;
    private SpeedController speedController;

    private SpeedInstance() {
        playerMap = new HashMap<>();
        deck = new Deck();
        playOptions = new Card[2];
        speedController = new SpeedController();
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

    public Card[] getPlayOptions() {
        return playOptions;
    }

    public void setPlayOptions(Card[] playOptions) {
        this.playOptions = playOptions;
    }
}
