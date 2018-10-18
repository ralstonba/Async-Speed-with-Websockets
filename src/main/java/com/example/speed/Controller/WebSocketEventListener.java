package com.example.speed.Controller;

import com.example.speed.Model.SpeedInstance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListener {
    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

    @EventListener
    public void handleWebSocketConnectedListener(SessionConnectedEvent event) {
        String sessionID = event.getMessage().getHeaders().get("simpSessionId").toString();
        if (sessionID == null) {
            logger.warn("New web socket connection, SessionID unknown");
        } else {
            logger.info("New web socket connection, SessionID: " + sessionID);

            SpeedController speedController = SpeedInstance.getInstance().getSpeedController();

            if (speedController.addPlayer(sessionID)) {
                logger.info("Connection with SessionID: " + sessionID + " was added to the game");
            } else {
                logger.info("Connection with SessionID: " + sessionID + " was not added to the game");
                // TODO: Game is full, display appropriate message to player
            }
        }
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        String sessionID = event.getSessionId();
        if (sessionID == null) {
            logger.warn("Websocket disconnection, SessionID unknown");
            // TODO: do some checking to make sure the disconnected user was not a player
        } else {
            logger.info("Websocket disconnection, SessionID: " + sessionID);

            SpeedController speedController = SpeedInstance.getInstance().getSpeedController();

            if (speedController.removePlayer(sessionID)) {
                logger.info("Player with SessionID: " + sessionID + " was removed from the game");
            } else {
                logger.info("Player with SessionID: " + sessionID + " was not a member of the game");
            }
        }
    }
}