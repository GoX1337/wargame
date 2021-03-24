package com.gox.wargame.message;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.UUID;

@Getter
@Setter
@ToString
public class Message {

    private UUID id;
    private Position position;
    private Offset offset;
    private Status status;
    private UUID eventSource;
}
