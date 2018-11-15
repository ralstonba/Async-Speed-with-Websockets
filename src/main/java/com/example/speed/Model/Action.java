package com.example.speed.Model;

public class Action {
    private Card source;
    private Card destination;

    public Action() {
    }

    public Card getSource() {
        return source;
    }

    public void setSource(Card source) {
        this.source = source;
    }

    public Card getDestination() {
        return destination;
    }

    public void setDestination(Card destination) {
        this.destination = destination;
    }
}