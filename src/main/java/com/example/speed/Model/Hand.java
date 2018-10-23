package com.example.speed.Model;

import java.util.ArrayList;
import java.util.List;

public class Hand {

    private List<Card> cards;

    public Hand() {
        cards = new ArrayList<>();
    }

    public int getSize() {
        return cards.size();
    }

    public void addCard(Card card) {
        cards.add(card);
    }

    public List<Card> getHand() {
        return cards;
    }

    public Card playCard(Card card) {
        // TODO: Decide how to play cards
        throw new UnsupportedOperationException("Not yet implemented");
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