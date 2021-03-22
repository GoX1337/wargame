package com.gox.wargame.controller;

import com.gox.wargame.entity.Batalion;
import com.gox.wargame.message.Message;
import com.gox.wargame.message.OutputMessage;
import com.gox.wargame.message.Position;
import com.gox.wargame.message.Status;
import com.gox.wargame.repository.BatalionRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

@Controller
@Log
public class MessageHandlerController {

    @Autowired
    private BatalionRepository batalionRepository;

    @MessageMapping("/position")
    public void sendPosition(Position pos) throws Exception {
        log.info("/position message received: " + pos);
        if(Status.MOVED.equals(pos.getStatus())){
            batalionRepository
                .findById(pos.getId())
                .ifPresent(b -> {
                    b.setX(pos.getX());
                    b.setY(pos.getY());
                    batalionRepository.save(b);
                    log.info("Update batalion " + b);
                }
            );
        }
    }

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public OutputMessage send(final Message message) throws Exception {
        final String time = new SimpleDateFormat("HH:mm").format(new Date());
        log.info("/chat message received: " + message);
        return new OutputMessage(message.getFrom(), message.getText(), time);
    }
}
