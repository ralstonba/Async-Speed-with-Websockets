package com.example.speed.Model;

public class SpeedInstance {
    private static SpeedInstance ourInstance = new SpeedInstance();

    private SpeedInstance() {
    }

    public static SpeedInstance getInstance() {
        return ourInstance;
    }
}
