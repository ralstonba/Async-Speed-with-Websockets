package com.example.speed.Controller;

import com.example.speed.Model.Action;
import com.example.speed.Model.Player;
import com.example.speed.Model.SpeedInstance;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
public class SpeedController {
    // A controller (annotated with @Controller) needs to exist to serve static content

    private static final SpeedInstance speedInstance = SpeedInstance.getInstance();
    // TODO: Add game logic stuff

    @MessageMapping("/rest/api/game.playCard")
    @SendTo("/speed")
    public SpeedInstance playCard(@Payload Action cardMove) {
        // TODO: Update game instance using Action
        return SpeedInstance.getInstance();
    }

    public boolean addPlayer(String sessionID) {
        Map playerMap = speedInstance.getPlayerMap();
        if (playerMap.size() < 2) {
            if (!playerMap.containsKey(sessionID)) {
                playerMap.put(sessionID, new Player(sessionID));
                return true;
            }
        }
        return false;
    }
}
