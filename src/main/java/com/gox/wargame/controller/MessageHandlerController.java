package com.gox.wargame.controller;

import com.gox.wargame.message.Message;
import com.gox.wargame.message.Status;
import com.gox.wargame.repository.BatalionRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@Log
public class MessageHandlerController {

    @Autowired
    private BatalionRepository batalionRepository;

    @MessageMapping("/position")
    @SendTo("/topic/position")
    public Message sendPosition(Message msg) {
        log.info("/position message received: " + msg);
        if(Status.MOVED.equals(msg.getStatus())){
            batalionRepository
                .findById(msg.getId())
                .ifPresent(b -> {
                    b.setX(msg.getPosition().getX());
                    b.setY(msg.getPosition().getY());
                    batalionRepository.save(b);
                    log.info("Update batalion " + b);
                }
            );
        }
        return msg;
    }
}
