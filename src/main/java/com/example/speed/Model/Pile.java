package com.example.speed.Model;

import java.util.EmptyStackException;
import java.util.Stack;

public class Pile {

    private Stack<Card> cards;

    public Pile() {
        cards = new Stack<>();
    }

    public Pile(Stack<Card> cards) {
        this.cards = cards;
    }

    public Card pop() throws EmptyStackException {
        return cards.pop();
    }

    public void push(Card card) {
        cards.push(card);
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();

        for (Card card : cards) {
            sb.append(card.toString());
            sb.append("\n");
        }

        return sb.toString();
    }
}
