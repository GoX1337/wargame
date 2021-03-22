package com.gox.wargame.controller;

import com.gox.wargame.message.Message;
import com.gox.wargame.message.OutputMessage;
import lombok.extern.java.Log;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@Log
public class MessageHandlerController {

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public OutputMessage send(final Message message) throws Exception {
        final String time = new SimpleDateFormat("HH:mm").format(new Date());
        log.info("/chat message received: " + message);
        return new OutputMessage(message.getFrom(), message.getText(), time);
    }
}
