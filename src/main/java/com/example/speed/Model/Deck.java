package com.example.speed.Model;

import java.util.Collections;
import java.util.EmptyStackException;
import java.util.Stack;

public class Deck {

    private Stack<Card> cards;

    public Deck() {
        cards = new Stack<>();
    }

    public boolean init() {
        if (cards == null) {
            return false;
        }

        for (Suit suit : Suit.values()) {
            for (Rank rank : Rank.values()) {
                Card card = new Card(suit, rank);
                cards.push(card);
            }
        }

        return true;
    }

    public void shuffle() {
        Collections.shuffle(cards);
    }

    public Card dealCard() throws EmptyStackException {
        return cards.pop();
    }

    public void addCard(Card card) {
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
