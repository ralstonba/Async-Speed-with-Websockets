package com.example.speed.Controller;

import com.example.speed.Model.Action;
import com.example.speed.Model.SpeedInstance;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class SpeedController {
    // A controller (annotated with @Controller) needs to exist to serve static content
    // TODO: Add game logic stuff

    @MessageMapping("/rest/api/game.playCard")
    @SendTo("/speed")
    public SpeedInstance playCard(@Payload Action cardMove) {
        // TODO: Update game instance using Action
        return SpeedInstance.getInstance();
    }
}
