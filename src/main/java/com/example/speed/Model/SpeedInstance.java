package com.example.speed.Model;

import com.example.speed.Controller.SpeedController;

import java.util.HashMap;
import java.util.Map;

public class SpeedInstance {
    // Volatile ensures the most recent value is returned
    private static volatile SpeedInstance ourInstance;

    private Map<String, Player> playerMap;
    private Deck deck;
    private Card[] playOptions;
    private SpeedController speedController;
    private GameState gameState;

    private static Object mutex = new Object();

    private SpeedInstance() {
        playerMap = new HashMap<>();
        deck = new Deck();
        playOptions = new Card[2];
        speedController = new SpeedController();
        gameState = GameState.AWAITING_PLAYERS;
    }

    public static SpeedInstance getInstance() {

        SpeedInstance instance = ourInstance;
        if (instance == null) {
            synchronized (mutex) {
                instance = ourInstance;
                if (instance == null) {
                    ourInstance = instance = new SpeedInstance();
                }
            }
        }

        return instance;
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

    public GameState getGameState() {
        return gameState;
    }

    public void setGameState(GameState gameState) {
        this.gameState = gameState;
    }
}
