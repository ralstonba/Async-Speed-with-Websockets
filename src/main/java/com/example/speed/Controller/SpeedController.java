package com.example.speed.Controller;

import com.example.speed.Model.*;
import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import javax.validation.constraints.NotNull;
import java.util.Arrays;
import java.util.Collection;
import java.util.Map;

@Controller
public class SpeedController {

    private static final Logger logger = LoggerFactory.getLogger(SpeedController.class);
    private static SpeedInstance speedInstance;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    
    @MessageMapping("/game.init")
    public void initGame() {
        speedInstance = SpeedInstance.getInstance();
        Map playerMap = speedInstance.getPlayerMap();

        if (playerMap.size() == 2 && (speedInstance.getGameState() == GameState.AWAITING_PLAYERS ||
                speedInstance.getGameState() == GameState.COMPLETE)) {
            // Initialize deck
            Deck deck = speedInstance.getDeck();
            deck.init();
            deck.shuffle();

            // Deal out play options
            for (int i = 0; i < speedInstance.getPlayOptions().length; i++) {
                speedInstance.getPlayOptions()[i] = deck.dealCard();
            }

            // Deal to players
            Collection<Player> players = speedInstance.getPlayerMap().values();
            for (Player player : players) {
                for (int i = 0; i < 5; i++) {
                    player.getExtraPile().push(deck.dealCard());
                }

                for (int i = 0; i < 20; i++) {
                    player.getDrawPile().addCard(deck.dealCard());
                }

                for (int i = 0; i < 5; i++) {
                    player.getHand().addCard(player.getDrawPile().dealCard());
                }
            }
            speedInstance.setGameState(GameState.IN_PROGRESS);
        }
    }

    @MessageMapping("/game.playCard")
    public void playCard(@Payload Action cardMove, @Header("simpSessionId") String sessionID) {
        speedInstance = SpeedInstance.getInstance();
        logger.debug("playCard endpoint hit by user with sessionID: {}", sessionID);

        if (sessionID != null) {

            if (validatePlayerMove(speedInstance, cardMove, sessionID)) {
                logger.info("playCard request from {} valid", sessionID);
                playCardHelper(speedInstance, cardMove, sessionID);
            } else {
                logger.info("playCard request from {} invalid, REJECTED", sessionID);
            }

        } else {
            logger.debug("playCard request from unknown sessionID, REJECTED");
        }

        if (checkWinner(speedInstance, sessionID)) {
            speedInstance.setGameState(GameState.COMPLETE);
            sendGameState(speedInstance);
        } else {
            sendGameState(speedInstance);
        }
    }

    @MessageMapping("/game.drawCard")
    public void drawCard(@Header("simpSessionId") String sessionID) {
        speedInstance = SpeedInstance.getInstance();
        Map playerMap = speedInstance.getPlayerMap();
        if (playerMap.containsKey(sessionID)) {
            Player player = (Player) playerMap.get(sessionID);
            Hand hand = player.getHand();
            Deck deck = player.getDrawPile();
            if (hand.getSize() < 5 && deck.getSize() > 0) {
                hand.addCard(deck.dealCard());
            }
        }
        sendGameState(speedInstance);
    }

    @MessageMapping("/game.stalemate")
    public void stalemate(@Header("simpSessionId") String sessionID) {
        speedInstance = SpeedInstance.getInstance();
        int count;

        Player player = speedInstance.getPlayerMap().get(sessionID);
        count = 0;
        for (int i = 0; i < 5; i++) {
            if (player.getHand().getHand().get(i) != speedInstance.getPlayOptions()[0]
                    && player.getHand().getHand().get(i) != speedInstance.getPlayOptions()[1]) {
                count++;
            }
        }
        if (count == 5) {
            player.setHandStale(true);
        }

        boolean isGameStale = true;
        for (Player thisPlayer : speedInstance.getPlayerMap().values()) {
            if (!thisPlayer.isHandStale()) {
                isGameStale = false;
                break;
            }
        }
        if (isGameStale) {
            speedInstance.setGameState(GameState.STALE);
        }
    }

    public boolean addPlayer(@NotNull String sessionID) {
        speedInstance = SpeedInstance.getInstance();
        Map playerMap = speedInstance.getPlayerMap();
        if (playerMap.size() < 2) {
            if (!playerMap.containsKey(sessionID)) {
                Player newPlayer = new Player();
                newPlayer.init(sessionID);
                playerMap.put(sessionID, newPlayer);
                //sendGameState(speedInstance);
                return true;
            }
        }
        return false;
    }

    public boolean removePlayer(@NotNull String sessionID) {
        speedInstance = SpeedInstance.getInstance();
        Map playerMap = speedInstance.getPlayerMap();
        if (playerMap.containsKey(sessionID)) {
            playerMap.remove(sessionID);
            return true;
        }
        return false;
    }

    private void sendGameState(@NotNull SpeedInstance thisGameState) {
        Gson gson = new Gson();
        for (String playerID : thisGameState.getPlayerMap().keySet()) {
            SanitizedGameState sanitizedGameState = new SanitizedGameState(playerID, thisGameState);
            messagingTemplate.convertAndSendToUser(playerID, "/queue/reply", gson.toJson(sanitizedGameState));
        }
    }

    private boolean validatePlayerMove(@NotNull SpeedInstance thisGameState, Action cardMove, String sessionID) {
        Player thisPlayer = speedInstance.getPlayerMap().get(sessionID);

        if (thisPlayer.getHand().getHand().contains(cardMove.getSource())) {
            if (Arrays.asList(speedInstance.getPlayOptions()).contains(cardMove.getDestination())) {
                logger.debug("Player {} selected a valid destination target, checking for acceptance", sessionID);

                /*
                        Valid moves are defined as source being +/- 1 from destination
                        - Special consideration for playing an Ace; it can be played on either a 2 or King
                        - Special consideration for playing a King; it can be player on either an Ace or Queen
                 */
                Rank sourceCard = cardMove.getSource().getRank();
                Rank destinationCard = cardMove.getDestination().getRank();

                switch (sourceCard) {
                    case TWO:
                    case THREE:
                    case FOUR:
                    case FIVE:
                    case SIX:
                    case SEVEN:
                    case EIGHT:
                    case NINE:
                    case TEN:
                    case JACK:
                    case QUEEN:
                        logger.debug("Source card: {}, treating as general case", sourceCard);
                        if (sourceCard.ordinal() == destinationCard.ordinal() + 1 || sourceCard.ordinal() == destinationCard.ordinal() - 1) {
                            logger.debug("For Source: {} and Destination: {}, play was valid", sourceCard, destinationCard);
                            return true;
                        }
                        break;
                    case KING:
                        logger.debug("Using special case for KING");
                        if (destinationCard == Rank.QUEEN || destinationCard == Rank.ACE) {
                            logger.debug("For Source: {} and Destination: {}, play was valid", sourceCard, destinationCard);
                            return true;
                        }
                        break;
                    case ACE:
                        logger.debug("Using special case for ACE");
                        if (destinationCard == Rank.KING || destinationCard == Rank.TWO) {
                            logger.debug("For Source: {} and Destination: {}, play was valid", sourceCard, destinationCard);
                            return true;
                        }
                        break;
                    default:
                        logger.warn("Source Card rank not recognized in playCard");
                        break;
                }

            } else {
                logger.debug("Player {} attempted to play on a card that was not a destination option", sessionID);
            }
        } else {
            logger.debug("Player {} attempted to play a card that is not in their hand", sessionID);
        }

        return false;
    }

    private void playCardHelper(@NotNull SpeedInstance thisGameState, Action cardMove, String sessionID) {
        Player player = thisGameState.getPlayerMap().get(sessionID);

        if (player != null) {
            Card cardToPlay = cardMove.getSource();

            if (player.getHand().getHand().remove(cardToPlay)) {
                logger.debug("The source card was successfully removed from the players hand");

                for (Card card : thisGameState.getPlayOptions()) {
                    if (card.equals(cardMove.getDestination())) {
                        card = cardMove.getSource();
                    }
                }

            } else {
                logger.warn("Failed to remove the source card from the players hand");
            }
        } else {
            logger.warn("Player was null when attempting to play card, SessionID: {}", sessionID);
        }
    }

    private boolean checkWinner(SpeedInstance thisGameState, String sessionID) {
        Player thisPlayer = thisGameState.getPlayerMap().get(sessionID);

        return thisPlayer.getCardsRemaining() == 0 && thisGameState.getGameState() == GameState.IN_PROGRESS;
    }
}
