package com.example.speed.Model;

public class Action {
    private ActionType type;
    private Card source;
    private Card destination;

    public ActionType getType() {
        return type;
    }

    public void setType(ActionType type) {
        this.type = type;
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