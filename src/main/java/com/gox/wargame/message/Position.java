package com.gox.wargame.message;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.UUID;

@Getter
@Setter
@ToString
public class Position {

    private UUID id;
    private int x;
    private int y;

}
